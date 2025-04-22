import express from "express";
// Extend the Request interface to include the user property
// declare module "express-serve-static-core" {
//   interface Request {
//     user?: any;
//   }
// }
import serverless from "@vendia/serverless-express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import Controller from "./interfaces/controllers";
import DynamoDBRepository from "./inflastructure/repository/DynamoDB";
import IRepository from "./domain/interface/repository";
import router from "./inflastructure/router";

//DynamoDBへの依存を注入
const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);
const repository: IRepository = new DynamoDBRepository(client);
//Controllerを展開
export const controllers = new Controller(repository);

const app = express();
app.use(express.json()); // JSONリクエストボディのパース

// ルーティング
app.use(router);

// ルート
app.get("/", (req, res) => {
  res.send("Here is MaToolAPI");
});

// Lambda 用にサーバーレスハンドラーをエクスポート
export const handler = serverless({ app });
