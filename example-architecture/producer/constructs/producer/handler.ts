import { APIGatewayProxyResult } from "aws-lambda";
import { ExamplePersonContract } from "example-architecture/events";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const contractBody: ExamplePersonContract = {
    firstName: "April",
    lastName: "Bates",
  };
  return { statusCode: 200, body: JSON.stringify(contractBody) };
};
