import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({});

export async function postHandler(bucketName: string, key: string, body: any) {
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify(body),
    ContentType: "application/json",
  });

  await client.send(putCommand);
  return { message: `Data stored at ${key}` };
}
