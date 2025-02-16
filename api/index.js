import { Router } from "express";
import indexRouter from "./routes/indexRoutes.js";

const routes = Router();

routes.use("/", indexRouter);

export default routes;
