import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({});

export async function deleteHandler(bucketName: string, key: string) {
  const delCommand = new DeleteObjectCommand({ Bucket: bucketName, Key: key });
  await client.send(delCommand);
  return { message: `Deleted ${key}` };
}
