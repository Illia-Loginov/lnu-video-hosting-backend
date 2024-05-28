import {
  clientConfig,
  bucket,
  inputFolder,
  uploadConfig,
  urlExpiration
} from './config/s3.config.js';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client(clientConfig);

const getInputFileKey = (key) => `${inputFolder}/${key}`;

export const upload = async (key, fileStream) => {
  const upload = new Upload({
    client,
    params: {
      Bucket: bucket,
      Key: getInputFileKey(key),
      Body: fileStream
    },
    ...uploadConfig
  });

  upload.on('httpUploadProgress', (progress) => {
    console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
  });

  return await upload.done();
};

export const getUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: getInputFileKey(key)
  });

  return await getSignedUrl(client, command, { expiresIn: urlExpiration });
};
