import express from "express";
import path from "node:path";
import compression from "compression";
import helmet from "helmet";
import { fileURLToPath } from "node:url";
import routes from "../api/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function (app) {
  // Compression
  app.use(compression());

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "cdn.jsdelivr.net"],
          styleSrc: ["'self'", "cdn.jsdelivr.net"],
        },
      },
    })
  );

  // Render host reverse proxy
  app.set("trust proxy", 1);

  // Default middleware setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "..", "public")));

  // View engine setup
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "ejs");

  // Load routes
  app.use("/", routes);
}
