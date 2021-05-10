# A wrapper for AWS S3

## Description
S3Client - A Javascript Library for AWS S3 with typescript support

## Installing
```
npm install aws-s3Client
```

## Getting started

##### Import
```
// es5 example
const { s3Client } = require('aws-s3Client');
```
```
// es6 example
import { s3Client } from 'aws-s3Client' ;
```

##### Initialize Client
 - Initiate client with configuration (e.g. credentials: (cognito credential), region).
 
```
const client = await new s3Client({
    REGION: <REGION> // us-west-1,
    IDENTITY_POOL_ID: <IDENTITY_POOL_ID> // '44c50347-c1e0-400a-b221-5b3127b738e8'
  })
```

##### List Bucket

```
const { error, message, data } = await client.listBucket();
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Create Bucket

```
const { error, message, data } = await client.createBucket({ Bucket: <BUCKET_NAME> });
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Delete Bucket

```
const { error, message, data } = await client.deleteBucket({ Bucket: <BUCKET_NAME> });
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### List Objects

```
const { error, message, data } = await client.getObjectList({ Bucket: <BUCKET_NAME> });
  if (error) {
    console.log('error -->', message)
	return
  }
```

##### Upload Object

```
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

```
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

```
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

```
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