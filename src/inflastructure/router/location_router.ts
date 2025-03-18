import { locationController } from "../..";
import express from "express";
import { authenticate } from "../Cognito";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await locationController.get(req);
  res.status(result.status).json(result.body);
});

router.post("/", authenticate, async (req, res) => {
  const result = await locationController.post(req);
  res.status(result.status).json(result.body);
});

export default router;
