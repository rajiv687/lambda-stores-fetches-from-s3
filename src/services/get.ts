import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({});

export async function getHandler(bucketName: string, key: string) {
  const getCommand = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const data = await client.send(getCommand);

  const streamToString = (stream: any) =>
    new Promise<string>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      stream.on("error", reject);
    });

  const body = await streamToString(data.Body);
  return JSON.parse(body);
}
