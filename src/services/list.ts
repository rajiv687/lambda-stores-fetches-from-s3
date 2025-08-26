import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const client = new S3Client({});

export async function listHandler(bucketName: string) {
  const listCommand = new ListObjectsV2Command({ Bucket: bucketName });
  const data = await client.send(listCommand);

  const keys = data.Contents?.map((item) => item.Key) || [];
  return { files: keys };
}
