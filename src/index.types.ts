export type InitParams = {
  REGION: string;
  IDENTITY_POOL_ID: string;
};

export type PresignPutUrlParams = {
  bucketName: string;
  key: string;
  acl: string;
  contentType?: string;
  expires?: number;
};

export type PresignGetUrlParams = {
  bucketName: string;
  key: string;
  expires?: number;
};
