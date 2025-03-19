import express from "express";
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
import serverlessExpress from "@vendia/serverless-express";
import bodyParser from "body-parser";

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
console.log("index");

const app = express();
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// ルーティング
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/route", routeRouter);
router.use("/location", locationRouter);

app.use("/", router);
export const handler = serverlessExpress({ app });
