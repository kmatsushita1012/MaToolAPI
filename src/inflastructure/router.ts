import express from "express";
import { controllers } from "..";
import { authenticate } from "./Cognito";

const router = express.Router();

//District 全件
router.get("/regions/:regionId/districts", async (req, res) => {
  const result = await controllers.district.getAll(req);
  res.status(result.statusCode).json(result.body);
});
//Region 単一
router.get("/regions/:regionId", async (req, res) => {
  const result = await controllers.region.get(req);
  res.status(result.statusCode).json(result.body);
});
//Region 全件
router.get("/regions", async (req, res) => {
  const result = await controllers.region.getAll(req);
  res.status(result.statusCode).json(result.body);
});
//Region 更新
router.put("/regions/:regionId", authenticate, async (req, res) => {
  const result = await controllers.region.put(req);
  res.status(result.statusCode).json(result.body);
});

//Route 単一
router.get(
  "/districts/:districtId/routes?date=:date&title=:title",
  async (req, res) => {
    const result = await controllers.route.get(req);
    res.status(result.statusCode).json(result.body);
  }
);
//Route 現在
router.get("/districts/:districtId/routes/current", async (req, res) => {
  const result = await controllers.route.get(req);
  res.status(result.statusCode).json(result.body);
});
//Route 全件
router.get("/districts/:districtId/routes", async (req, res) => {
  const result = await controllers.route.getAll(req);
  res.status(result.statusCode).json(result.body);
});
//Route 追加
router.post("/districts/:districtId/routes", authenticate, async (req, res) => {
  const result = await controllers.route.post(req);
  res.status(result.statusCode).json(result.body);
});
//Route 更新
router.put(
  "/districts/:districtId/routes?date=:date&title=:title",
  authenticate,
  async (req, res) => {
    const result = await controllers.route.post(req);
    res.status(result.statusCode).json(result.body);
  }
);
//Route 削除
router.delete(
  "/districts/:districtId/routes?date=:date&title=:title",
  authenticate,
  async (req, res) => {
    const result = await controllers.route.delete(req);
    res.status(result.statusCode).json(result.body);
  }
);
//Location 単一
router.get("/districts/:districtId/location", async (req, res) => {
  const result = await controllers.location.get(req);
  res.status(result.statusCode).json(result.body);
});
// Location put
router.put(
  "/districts/:districtId/location",
  authenticate,
  async (req, res) => {
    const result = await controllers.location.put(req);
    res.status(result.statusCode).json(result.body);
  }
);
//Location 削除
router.delete(
  "/districts/:districtId/location",
  authenticate,
  async (req, res) => {
    const result = await controllers.location.delete(req);
    res.status(result.statusCode).json(result.body);
  }
);

//District 単一
router.get("/districts/:districtId", async (req, res) => {
  const result = await controllers.district.get(req);
  res.status(result.statusCode).json(result.body);
});
//District 更新
router.put("/districts/:districtId", authenticate, async (req, res) => {
  const result = await controllers.district.put(req);
  res.status(result.statusCode).json(result.body);
});
//District 追加
router.post("/districts", authenticate, async (req, res) => {
  const result = await controllers.district.post(req);
  res.status(result.statusCode).json(result.body);
});

export default router;
