import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { notFound } from "../../utils/Errors";
import { errorResponse } from "../../interfaces/responses";
import { regionController } from "../..";
import { Router } from "express";
import { authenticate } from "../Cognito";
const router = Router();

router.get("/summaries", async (req, res) => {
  const result = await regionController.getSummaries(req);
  res.status(result.status).json(result.body);
});

router.get("/detail", async (req, res) => {
  const result = await regionController.getDetail(req);
  res.status(result.status).json(result.body);
});

router.post("/", authenticate, async (req, res) => {
  const result = await regionController.post(req);
  res.status(result.status).json(result.body);
});

export default router;
