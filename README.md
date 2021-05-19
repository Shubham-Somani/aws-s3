# A wrapper for AWS S3

## Description
S3Client - A Javascript Library for AWS S3 File Upload
If using it with browser setup cors
## Installing
```
npm install aws-s3-manager
```

## Getting started

##### Import
``` javascript
// es5 example
const { AwsS3Manager } = require('aws-s3-manager');
```
``` javascript
// es6 example
import { AwsS3Manager } from 'aws-s3-manager' ;
```

##### Initialize Client
 - Initiate client with configuration (e.g. credentials: (cognito credential), region).
 
``` javascript
const client = await new AwsS3Manager({
    REGION: <REGION> // us-west-1,
    TYPE: 1,
    IDENTITY_POOL_ID: <IDENTITY_POOL_ID> // '44c50347-c1e0-400a-b221-5b3127b738e8'
  })
```

or

 
``` javascript
const client = await new AwsS3Manager({
    REGION: <REGION> // us-west-1,
    TYPE: 2,
    ACCESS_KEY_ID: <ACCESS_KEY_ID>,
    SECRET_ACCESS_KEY: <SECRET_ACCESS_KEY>
  })
```

##### List Bucket

``` javascript
const { error, message, data } = await client.listBucket();
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Create Bucket

``` javascript
const { error, message, data } = await client.createBucket({ Bucket: <BUCKET_NAME> });
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Delete Bucket

``` javascript
const { error, message, data } = await client.deleteBucket({ Bucket: <BUCKET_NAME> });
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### List Objects

``` javascript
const { error, message, data } = await client.getObjectList({ Bucket: <BUCKET_NAME> });
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Upload Object

``` javascript
const uploadParams = {
  ACL: "authenticated-read" | "aws-exec-read" | "bucket-owner-full-control" | "bucket-owner-read" | "private" | "public-read" | "public-read-write",
  Body: <FILE_BODY>,
  Bucket: <BUCKET_NAME>,
  Key:  <FILE_NAME>
}
const { error, message, data } = await client.uploadObject(uploadParams);
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Get Object

``` javascript
const getParams = {
  Bucket: <BUCKET_NAME>,
  Key:  <FILE_NAME>
}
const { error, message, data } = await client.getObject(getParams);
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Generate Get Object Signed URL

``` javascript
const getParams = {
  Bucket: <BUCKET_NAME>,
  Key:  <FILE_NAME>
}
const { error, message, data } = await client.getPresignedUrl(getParams);
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Generate Upload Object Signed URL

``` javascript
const uploadParams = {
  ACL: "authenticated-read" | "aws-exec-read" | "bucket-owner-full-control" | "bucket-owner-read" | "private" | "public-read" | "public-read-write",
  Bucket: <BUCKET_NAME>,
  Key:  <FILE_NAME>
}
const { error, message, data } = await client.putPresignedUrl(uploadParams);
  if (error) {
    console.log('error -->', message)
	return
  }
```