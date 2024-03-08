import { S3Client, DeleteObjectCommand, DeleteObjectCommandInput } from '@aws-sdk/client-s3';

const deleteImageById = async (id: string) => {
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
  const params: DeleteObjectCommandInput = {
    Bucket: process.env.S3_BUCKET,
    Key: id,
  };
  const command = new DeleteObjectCommand(params);
  try {
    await client.send(command);
  } catch (error) {
    console.log({error});
  }
};

export default deleteImageById;
