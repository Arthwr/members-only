import { Router } from "express";
import indexRouter from "./routes/indexRoutes.js";

const routes = Router();

// 204 status to prevent browser favicon error requests
routes.get("/favicon.ico", (req, res) => res.status(204).end());

routes.use("/", indexRouter);

export default routes;
