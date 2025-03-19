import { districtController } from "../..";
import { Router } from "express";
import { authenticate } from "../Cognito";

const router = Router();

router.get("/summaries", async (req, res) => {
  const result = await districtController.getSummaries(req);
  res.status(result.status).json(result.body);
});

router.get("/detail", async (req, res) => {
  const result = await districtController.getDetail(req);
  res.status(result.status).json(result.body);
});

router.post("/", authenticate, async (req, res) => {
  const result = await districtController.post(req);
  res.status(result.status).json(result.body);
});

export default router;
