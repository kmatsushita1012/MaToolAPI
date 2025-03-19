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
import AWSRepository from "./inflastructure/repository/DynamoDB";
import IRepository from "./domain/interface/repository";
import {
  regionRouter,
  districtRouter,
  routeRouter,
  locationRouter,
} from "./inflastructure/router";

//DynamoDBへの依存を注入
const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);
const repository: IRepository = new AWSRepository(client);
//Controllerを展開
export const {
  regionController,
  districtController,
  routeController,
  locationController,
} = new Controller(repository).all();
console.log("index1");
const app = express();
app.use(express.json()); // JSONリクエストボディのパース
console.log("index2");
// ルーティング
app.use("/region", regionRouter);
app.use("/district", districtRouter);
app.use("/route", routeRouter);
app.use("/location", locationRouter);
console.log("index3");
// テスト
app.get("/region/summaries", (req, res) => {
  res.send("/region/summaries");
});
// ルート
app.get("/", (req, res) => {
  res.send("Here is MaToolAPI");
});
console.log("index3");

// Lambda 用にサーバーレスハンドラーをエクスポート
export const handler = serverless({ app });
