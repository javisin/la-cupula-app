import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const uploadFile = async (data: Buffer, name: string) => {
  const { AWS_REGION, AWS_BUCKET_NAME } = process.env;

  if (!AWS_BUCKET_NAME || !AWS_REGION) {
    throw new Error('Missing AWS credentials');
  }

  const client = new S3Client({ region: AWS_REGION });

  const command = new PutObjectCommand({
    ACL: 'public-read',
    Body: data,
    Bucket: AWS_BUCKET_NAME,
    Key: name,
  });

  try {
    await client.send(command);
  } catch (err) {
    console.error(err);
  }
};

export default uploadFile;
