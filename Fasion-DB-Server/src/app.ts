import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import os from "os";
import path from "path";
import { readFile } from "fs/promises";
import { StatusCodes } from "http-status-codes";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { authDocs } from "./swagger/authDocs";

import { userDocs } from "./swagger/userDoc";
import { productSwaggerDoc } from "./swagger/productSwaggerDoc";
import { favoriteSwaggerDoc } from "./swagger/favoriteSwaggerDoc";
import { categoryDocs } from "./swagger/category.swagger";
import { shopDocs } from "./swagger/shopDocs";
import { orderwaggerDoc } from "./swagger/orderSwaggerDoc";
import { reviewDocs } from "./swagger/reviewDoc";
import { flashSaleDocs } from "./swagger/flashsellDocs";
import { couponDocs } from "./swagger/coupon.swagger";
import { paymentDocs } from "./swagger/paymentDocs.swagger";

// Example env variable
const configs = { env: process.env.NODE_ENV || "development" };

const app: Application = express();

// ------------------- Swagger Setup -------------------

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FasionDB API - Documentation Written by SS JOY",
      version: "1.0.0",
      description:
        "Express API with auto-generated Swagger docs now available at /docs",
    },
    paths: {
      ...authDocs,
      ...userDocs,
      ...categoryDocs,
      ...shopDocs,
      ...couponDocs,
      ...orderwaggerDoc,
      ...productSwaggerDoc,
      ...favoriteSwaggerDoc,
      ...reviewDocs,
      ...flashSaleDocs,
      ...paymentDocs,
    },
    servers:
      configs.env === "production"
        ? [
            { url: "https://fasion-db-server.onrender.com" },
            { url: "http://localhost:5050" },
          ]
        : [
            { url: "http://localhost:5050" },
            { url: "https://fasion-db-server.onrender.com" },
          ],
    components: {
      securitySchemes: {
        AuthorizationToken: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Put your accessToken here ",
        },
      },
    },
    security: [
      {
        AuthorizationToken: [],
      },
    ],
  },
  apis: [
    path.join(
      __dirname,
      configs.env === "production" ? "./**/*.js" : "./**/*.ts"
    ),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ------------------- Middleware -------------------
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log login and register payloads to a file
import { appendFile } from "fs/promises";
app.use(async (req: Request, res: Response, next: NextFunction) => {
   if (req.path === "/api/v1/auth/login" || req.path === "/api/v1/user") {
      const logMsg = `[${new Date().toISOString()}] PATH: ${req.path} | BODY: ${JSON.stringify(req.body)}\n`;
      try {
         await appendFile(path.join(__dirname, "..", "auth_debug.log"), logMsg, "utf8");
      } catch (err) {
         console.error("Failed to write auth log:", err);
      }
   }
   next();
});

// ------------------- Routes -------------------
app.use("/api/v1", router);

// ------------------- Test Route -------------------
// ------------------- Test Route -------------------
app.get("/", async (req: Request, res: Response) => {
  try {
    const currentDateTime = new Date().toISOString();
    const clientIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip || req.connection.remoteAddress || "unknown") as string;
    const serverHostname = os.hostname();
    const serverPlatform = os.platform();
    const serverUptime = os.uptime();
    const uptime = `${Math.floor(serverUptime / 3600)}h ${Math.floor((serverUptime % 3600) / 60)}m`;

    const templatePath = path.join(__dirname, "templates", "index.html");
    let htmlContent = await readFile(templatePath, "utf8");

    htmlContent = htmlContent
      .replace("{{env}}", configs.env)
      .replace("{{clientIp}}", clientIp)
      .replace("{{currentDateTime}}", currentDateTime)
      .replace("{{serverHostname}}", serverHostname)
      .replace("{{serverPlatform}}", serverPlatform)
      .replace("{{uptime}}", uptime);

    res.status(StatusCodes.OK).send(htmlContent);
  } catch (error) {
    // Fallback to a simple response if template not found
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server info page template not found.");
  }
});

// ------------------- 404 Not Found Handler -------------------
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const templatePath = path.join(__dirname, "templates", "404.htm");
    const htmlContent = await readFile(templatePath, "utf8");
    res.status(StatusCodes.NOT_FOUND).send(htmlContent);
  } catch (error) {
    // Fallback to a simple 404 if template not found
    res.status(StatusCodes.NOT_FOUND).send("404 - Page Not Found");
  }
});

// ------------------- Error Handlers -------------------
app.use(globalErrorHandler);


export default app;
