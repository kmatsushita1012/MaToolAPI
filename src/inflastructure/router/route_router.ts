import { routeController } from "../..";
import { Router } from "express";
import { authenticate } from "../Cognito";
const router = Router();

router.get("/summaries", async (req, res) => {
  const result = await routeController.getSummaries(req);
  res.status(result.statusCode).json(result.body);
});

router.get("/detail", async (req, res) => {
  const result = await routeController.getDetail(req);
  res.status(result.statusCode).json(result.body);
});

router.post("/", authenticate, async (req, res) => {
  const result = await routeController.post(req);
  res.status(result.statusCode).json(result.body);
});

router.delete("/", authenticate, async (req, res) => {
  const result = await routeController.delete(req);
  res.status(result.statusCode).json(result.body);
});

export default router;
