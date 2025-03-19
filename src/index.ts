// src/app.ts
import { Request, Response } from "express";
// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import Controller from "./interfaces/controllers";
import AWSRepository from "./inflastructure/repository/DynamoDB";
import IRepository from "./domain/interface/repository";
import AppRouter from "./inflastructure/router";

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
const { regionRouter, districtRouter, routeRouter, locationRouter } = AppRouter;

const express = require("express");
const app = express();
const awsServerlessExpress = require("aws-serverless-express");
const server = awsServerlessExpress.createServer(app);

app.use(express.json()); // JSONリクエストボディのパース

// ルーティング
app.use("/region", regionRouter);
app.use("/district", districtRouter);
app.use("/route", routeRouter);
app.use("/location", locationRouter);

// app.use("/", (req: Request, res: Response) =>
//   res.send(`Hello. Here is MaToolAPI`)
// );

// ローカル確認用
if (process.env.NODE_ENV === `develop`) app.listen(3000);

exports.handler = (event: any, context: any) => {
  awsServerlessExpress.proxy(server, event, context);
};
