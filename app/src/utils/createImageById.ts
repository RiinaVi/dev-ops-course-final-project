import { File } from 'formidable';
import fs from 'fs';
import { PutObjectCommand, S3Client, PutObjectCommandInput } from '@aws-sdk/client-s3';

const createImageById = async (id: string, file: File) => {
  const rawData = fs.readFileSync(file.path);
  const region = process.env.S3_REGION;
  const accessKeyId = process.env.S3_API_KEY;
  const secretAccessKey = process.env.S3_API_SECRET;
  const client = new S3Client(
    {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    }
  );
  const params: PutObjectCommandInput = {
    Bucket: process.env.S3_BUCKET,
    Key: id,
    Body: rawData,
    ACL: 'public-read',
  };
  const command = new PutObjectCommand(params);
  try {
    await client.send(command);
  } catch (error) {
    console.log({error});
  }

  return id;
};

export default createImageById;
