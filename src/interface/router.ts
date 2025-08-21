import express, { Router } from "express";
import { authenticate } from "../inflastructure/authenticate";
import { Controllers } from "./controllers";

const createRouter = (controllers: Controllers): Router => {
  const router = express.Router();

  //District 全件
  router.get("/regions/:regionId/districts", async (req, res) => {
    const result = await controllers.district.getAll(req);
    res.status(result.statusCode).json(result.body);
  });
  //District 追加
  router.post(
    "/regions/:regionId/districts",
    authenticate,
    async (req, res) => {
      const result = await controllers.district.post(req);
      res.status(result.statusCode).json(result.body);
    }
  );
  //Location 全件
  router.get("/regions/:regionId/locations", async (req, res) => {
    const result = await controllers.location.getAll(req);
    res.status(result.statusCode).json(result.body);
  });
  //Region 単一
  router.get("/regions/:regionId", async (req, res) => {
    const result = await controllers.region.get(req);
    res.status(result.statusCode).json(result.body);
  });

  //Region 更新
  router.put("/regions/:regionId", authenticate, async (req, res) => {
    const result = await controllers.region.put(req);
    res.status(result.statusCode).json(result.body);
  });
  //Region 全件
  router.get("/regions", async (req, res) => {
    const result = await controllers.region.getAll(req);
    res.status(result.statusCode).json(result.body);
  });

  //Route 現在
  router.get(
    "/districts/:districtId/routes/current",
    authenticate,
    async (req, res) => {
      const result = await controllers.route.getCurrent(req);
      res.status(result.statusCode).json(result.body);
    }
  );
  //Route 編集用
  router.get("/districts/:districtId/tools", authenticate, async (req, res) => {
    const result = await controllers.district.getTools(req);
    res.status(result.statusCode).json(result.body);
  });
  //Route 全件
  router.get(
    "/districts/:districtId/routes",
    authenticate,
    async (req, res) => {
      const result = await controllers.route.getAll(req);
      res.status(result.statusCode).json(result.body);
    }
  );
  //Route 追加
  // router.post(
  //   "/districts/:districtId/routes",
  //   authenticate,
  //   async (req, res) => {
  //     const result = await controllers.route.post(req);
  //     res.status(result.statusCode).json(result.body);
  //   }
  // );
  //Location 単一
  router.get(
    "/districts/:districtId/locations",
    authenticate,
    async (req, res) => {
      const result = await controllers.location.get(req);
      res.status(result.statusCode).json(result.body);
    }
  );
  // Location put
  router.put(
    "/districts/:districtId/locations",
    authenticate,
    async (req, res) => {
      const result = await controllers.location.put(req);
      res.status(result.statusCode).json(result.body);
    }
  );
  //Location 削除
  router.delete(
    "/districts/:districtId/locations",
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
  //Route 単一
  router.get("/routes/:routeId", authenticate, async (req, res) => {
    const result = await controllers.route.get(req);
    res.status(result.statusCode).json(result.body);
  });

  //Route 更新
  // router.put("/routes/:routeId", authenticate, async (req, res) => {
  //   const result = await controllers.route.put(req);
  //   res.status(result.statusCode).json(result.body);
  // });
  //Route 削除
  // router.delete("/routes/:routeId", authenticate, async (req, res) => {
  //   const result = await controllers.route.delete(req);
  //   res.status(result.statusCode).json(result.body);
  // });

  //Route Id
  router.get("/routes", authenticate, async (req, res) => {
    const result = await controllers.route.getIds(req);
    res.status(result.statusCode).json(result.body);
  });
  return router;
};

export default createRouter;
