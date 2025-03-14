import { APIGatewayProxyResult } from "aws-lambda";
import { APIError } from "./error";

export const successResponse = (
  body: any,
  status: number = 200
): APIGatewayProxyResult => ({
  statusCode: status,
  body: JSON.stringify(body),
});

export const errorResponse = (error: any): APIGatewayProxyResult => {
  if (error instanceof APIError) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({ message: error.message }),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: String(error) }),
    };
  }
};
