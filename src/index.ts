import express from "express";
import serverless from "@vendia/serverless-express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
  createControllers,
  createDynamoDBRepositories,
  createUsecases,
} from "./di";
import createRouter from "./interface/router";

//DynamoDBへの依存を注入
const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);
const repositories = createDynamoDBRepositories(client, {
  region: "matool_regions",
  district: "matool_districts",
  route: "matool_routes",
  location: "matool_locations",
});
const usecases = createUsecases(repositories);
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
