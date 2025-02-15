import { Router } from "express";
import indexRouter from "./indexRoutes.js";

const routes = Router();

routes.use("/", indexRouter);

export default routes;
