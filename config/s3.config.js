const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET } =
  process.env;

export const clientConfig = {
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  },
  region: AWS_REGION
};

export { AWS_S3_BUCKET as bucket };
export const inputFolder = 'input-files';

export const uploadConfig = {
  queueSize: 4,
  partSize: 5 * 1024 * 1024
};
