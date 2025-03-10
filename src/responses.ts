import { APIGatewayProxyResult } from "aws-lambda";

export const internalServerErrorResponse = (): APIGatewayProxyResult => ({
  statusCode: 500,
  body: JSON.stringify({ message: "Internal Server Error" }),
});

export const notImplemented = (): APIGatewayProxyResult => ({
  statusCode: 501,
  body: JSON.stringify({ message: "Not Implemented" }),
});

export const badRequestResponse = (): APIGatewayProxyResult => ({
  statusCode: 400,
  body: JSON.stringify({ message: "Bad Request" }),
});

export const notFoundResponse = (): APIGatewayProxyResult => ({
  statusCode: 404,
  body: JSON.stringify({ message: "Not Found" }),
});

export const methodNotAllowedResponse = (): APIGatewayProxyResult => ({
  statusCode: 405,
  body: JSON.stringify({ message: "Method Not Allowed" }),
});
