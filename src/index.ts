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
  ListObjectsCommandOutput,
  GetObjectCommandInput,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  GetObjectCommandOutput
} from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Client as __Client } from '@aws-sdk/smithy-client';
import { HttpHandlerOptions as __HttpHandlerOptions } from '@aws-sdk/types';
import { InitParams } from './index.types';
// ...

export class AwsS3Manager {
  readonly S3: __Client<__HttpHandlerOptions, ServiceInputTypes, ServiceOutputTypes, S3ClientResolvedConfig>

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
  async putPresignedUrl(putParams: PutObjectCommandInput, expiresIn?: number): Promise<{ error: boolean, message: string, data: string | null }> {
    try {
      const command = new PutObjectCommand(putParams);
      const output = await getSignedUrl(this.S3, command, { expiresIn: expiresIn || 3600 });
      return {
        error: false,
        message: 'Signed url generated successfully',
        data: output
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  /***
   * Generate Get Presigned URL
   ***/
  async getPresignedUrl(putParams: GetObjectCommandInput, expiresIn?: number): Promise<{ error: boolean, message: string, data: string | null }> {
    try {
      const command = new GetObjectCommand(putParams);
      const output = await getSignedUrl(this.S3, command, { expiresIn: expiresIn || 3600 });
      return {
        error: false,
        message: 'Signed url generated successfully',
        data: output
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }
  
  /***
   * List Buckets
   ***/
  async getBucketList(): Promise<{ error: boolean, message: string, data: ListBucketsCommandOutput | null }> {
    try {
      const command = new ListBucketsCommand({});
      const output = await this.S3.send(command);
      return {
        error: false,
        message: 'Bucket listed successfully',
        data: output
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  /***
   * Create Bucket
   ***/
  async createBucket(createBucketParams: CreateBucketCommandInput): Promise<{error: boolean, message: string, data: CreateBucketCommandOutput | null}> {
    try {
      const command = await new CreateBucketCommand(createBucketParams);
      const output = await this.S3.send(command);
      return {
        error: false,
        message: 'Bucket created successfully',
        data: output
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  /***
   * Delete Bucket
   ***/
  async deleteBucket(deleteBucketParams: DeleteBucketCommandInput): Promise<{ error: boolean, message: string, data: DeleteBucketCommandOutput | null }> {
    try {
      const command = new DeleteBucketCommand(deleteBucketParams);
      const output = await this.S3.send(command);
      return {
        error: false,
        message: 'Bucket deleted successfully',
        data: output
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  /***
   * List Objects
   ***/
  async getObjectList(listObjectParams: ListObjectsCommandInput): Promise<{ error: boolean, message: string, data: ListObjectsCommandOutput | null }> {
    try {
      const command = new ListObjectsCommand(listObjectParams);
      const output = await this.S3.send(command);
      return {
        error: false,
        message: 'Objects listed successfully',
        data: output
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  /***
   * Upload Object
   ***/
  async uploadObject(putObjectParams: PutObjectCommandInput): Promise<{ error: boolean, message: string, data: PutObjectCommandOutput | null }> {
    try {
      const command = new PutObjectCommand(putObjectParams);
      const output = await this.S3.send(command);
      return {
        error: false,
        message: 'Object uploaded successfully',
        data: output
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  /***
   * Get Object
   ***/
  async getObject(getObjectParams: GetObjectCommandInput): Promise<{ error: boolean, message: string, data: GetObjectCommandOutput | null }> {
    try {
      const command = new GetObjectCommand(getObjectParams);
      const output = await this.S3.send(command);
      return {
        error: false,
        message: 'Object fetched successfully',
        data: output
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }
}
