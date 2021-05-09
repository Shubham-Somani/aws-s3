// ...
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  ServiceInputTypes,
  GetObjectCommand,
  ListBucketsCommand,
  ServiceOutputTypes,
  S3ClientResolvedConfig,
  ListBucketsCommandOutput,
  CreateBucketCommand,
  CreateBucketCommandOutput,
  CreateBucketCommandInput,
  DeleteBucketCommandInput,
  DeleteBucketCommandOutput,
  DeleteBucketCommand,
  ListObjectsCommand,
  ListObjectsCommandInput,
  ListObjectsCommandOutput
} from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Client as __Client } from '@aws-sdk/smithy-client';
import { HttpHandlerOptions as __HttpHandlerOptions } from '@aws-sdk/types';
import { InitParams, PresignGetUrlParams, PresignPutUrlParams } from './index.types';
// ...

export class Envoltorio {
  S3: __Client<__HttpHandlerOptions, ServiceInputTypes, ServiceOutputTypes, S3ClientResolvedConfig>

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
  
  /***
   * List Buckets
   ***/
  async getBucketList(): Promise<ListBucketsCommandOutput> {
    const command = new ListBucketsCommand({});
    return await this.S3.send(command);
  }

  /***
   * Create Bucket
   ***/
  async createBucket(createBucketParams: CreateBucketCommandInput): Promise<CreateBucketCommandOutput> {
    const command = new CreateBucketCommand(createBucketParams);
    return await this.S3.send(command);
  }

  /***
   * Delete Bucket
   ***/
  async deleteBucket(deleteBucketParams: DeleteBucketCommandInput): Promise<DeleteBucketCommandOutput> {
    const command = new DeleteBucketCommand(deleteBucketParams);
    return await this.S3.send(command);
  }

  /***
   * List Objects
   ***/
  async getObjectList(listObjectParams: ListObjectsCommandInput): Promise<ListObjectsCommandOutput> {
    const command = new ListObjectsCommand(listObjectParams);
    return await this.S3.send(command);
  }
}
