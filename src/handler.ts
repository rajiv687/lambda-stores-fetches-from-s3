import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getHandler } from "./services/get";
import { postHandler } from "./services/post";
import { deleteHandler } from "./services/delete";
import { listHandler } from "./services/list"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const bucketName = process.env.DataBucket!;
  const key = event.pathParameters?.key || "";

  try {
    let result: any;

    switch (event.httpMethod) {
      case "GET":
        result = key ? await getHandler(bucketName, key) : await listHandler(bucketName);
        break;
      case "POST":
        result = await postHandler(bucketName, key, JSON.parse(event.body || "{}"));
        break;
      case "DELETE":
        result = await deleteHandler(bucketName, key);
        break;
      default:
        return response(405, { error: "Method Not Allowed" });
    }

    return response(200, result);
  } catch (err: any) {
    console.error("Error:", err);
    return response(500, { error: err.message });
  }
};

function response(statusCode: number, body: any): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(body),
  };
}
