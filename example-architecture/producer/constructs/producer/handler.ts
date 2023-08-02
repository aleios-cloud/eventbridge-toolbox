import { APIGatewayProxyResult } from "aws-lambda";
import { examplePersonSchema } from "example-architecture/events";

export const main = async (): Promise<APIGatewayProxyResult> => {
  console.log(examplePersonSchema);
  return { statusCode: 200, body: "success" };
};
