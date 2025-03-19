import { locationController } from "../..";
import { Router } from "express";
import { authenticate } from "../Cognito";
const router = Router();

router.get("/", async (req, res) => {
  const result = await locationController.get(req);
  res.status(result.status).json(result.body);
});

router.post("/", authenticate, async (req, res) => {
  const result = await locationController.post(req);
  res.status(result.status).json(result.body);
});

export default router;
