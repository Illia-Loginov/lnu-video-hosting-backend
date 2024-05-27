import {
  clientConfig,
  bucket,
  inputFolder,
  uploadConfig
} from './config/s3.config.js';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const client = new S3Client(clientConfig);

export const upload = async (key, fileStream) => {
  const upload = new Upload({
    client,
    params: {
      Bucket: bucket,
      Key: `${inputFolder}/${key}`,
      Body: fileStream
    },
    ...uploadConfig
  });

  upload.on('httpUploadProgress', (progress) => {
    console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
  });

  return await upload.done();
};
