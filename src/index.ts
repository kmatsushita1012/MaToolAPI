import express from "express";
import serverless from "@vendia/serverless-express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import Controller from "./interface/controllers";
import DynamoDBRepository from "./inflastructure/repository/DynamoDB";
import IRepository from "./domain/interfaces/repository";
import router from "./inflastructure/router";

//DynamoDBへの依存を注入
const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);
const repository: IRepository = new DynamoDBRepository(client);
export const controllers = new Controller(repository);

const app = express();
app.use(express.json());

// ルーティング
app.use(router);

app.get("/", (req, res) => {
  res.send("Here is MaToolAPI");
});

export const handler = serverless({ app });
