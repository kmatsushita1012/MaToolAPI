import { handler } from "../src/index";
import { APIGatewayProxyEvent } from "aws-lambda";

const event: APIGatewayProxyEvent = {
  httpMethod: "GET",
  path: "/districts/detail",
  queryStringParameters: { id: "johoku" },
  // 他の必要なプロパティを追加
} as any;

handler(event)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
