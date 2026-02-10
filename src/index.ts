import express from "express";
import serverless from "@vendia/serverless-express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
  createCognitoUserManager,
  createControllers,
  createDynamoDBRepositories,
  createUsecases,
} from "./di";
import createRouter from "./interface/router";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from "dotenv";
dotenv.config();

const region = "ap-northeast-1";
const userPoolId = process.env.USER_POOL_ID ?? "";
console.log(userPoolId);
//DynamoDBへの依存を注入
const dynamoDBClient = new DynamoDBClient({ region: region });
const cognitoClient = new CognitoIdentityProviderClient({ region: region }); // 東京リージョンなど
const dynamoDBDocumentclient = DynamoDBDocumentClient.from(dynamoDBClient);

const repositories = createDynamoDBRepositories(dynamoDBDocumentclient, {
  region: "matool_regions",
  district: "matool_districts",
  route: "matool_routes_legacy",
  location: "matool_locations",
});
const cognitoManager = createCognitoUserManager(cognitoClient, userPoolId);
const usecases = createUsecases(repositories, cognitoManager);
const controllers = createControllers(usecases);
const router = createRouter(controllers);

const app = express();
app.use(express.json());

// ルーティング
app.use(router);

app.get("/", (req, res) => {
  res.send("Here is MaToolAPI");
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export const handler = serverless({ app });
