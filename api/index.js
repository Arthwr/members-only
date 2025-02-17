import { Router } from "express";
import indexRouter from "./routes/indexRoutes.js";
import houseRouter from "./routes/houseRoutes.js";

const routes = Router();

// 204 status to prevent browser favicon error requests
routes.get("/favicon.ico", (req, res) => res.status(204).end());

routes.use("/", indexRouter);
routes.use("/house", houseRouter);

export default routes;
