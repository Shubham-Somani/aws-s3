// ...
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand, ServiceInputTypes, GetObjectCommand } from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Client } from '@aws-sdk/smithy-client';
import { MetadataBearer } from '@aws-sdk/types';
import { InitParams, PresignGetUrlParams, PresignPutUrlParams } from './index.types';
// ...

export class Envoltorio {
  S3: Client<any, ServiceInputTypes, MetadataBearer, any>;

  constructor(parameters: InitParams) {
    // Initialize S3 Client
    this.S3 = new S3Client({
      region: parameters.REGION,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: parameters.REGION }),
        identityPoolId: `${parameters.REGION}:${parameters.IDENTITY_POOL_ID}`, // IDENTITY_POOL_ID
      }),
    });
  }

  /***
   * Generate Put Presigned URL 
  ***/
  async putPresignedUrl(putParams: PresignPutUrlParams): Promise<string> {
    const putObjectParams = {
      ACL: putParams.acl,
      Bucket: putParams.bucketName,
      Key: putParams.key,
      ContentType: putParams.contentType || '',
    };
    const command = new PutObjectCommand(putObjectParams);
    return await getSignedUrl(this.S3, command, { expiresIn: putParams.expires || 3600 });
  }

  /***
   * Generate Get Presigned URL 
  ***/
  async getPresignedUrl(putParams: PresignGetUrlParams): Promise<string> {
    const putObjectParams = {
      Bucket: putParams.bucketName,
      Key: putParams.key,
    };
    const command = new GetObjectCommand(putObjectParams);
    return await getSignedUrl(this.S3, command, { expiresIn: putParams.expires || 3600 });
  }
}
