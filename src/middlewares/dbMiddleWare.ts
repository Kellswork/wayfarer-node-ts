// Assuming you're using pg
import { NextFunction, Request, Response } from "express";
import { connectDB } from "../config/db";
import config from "../config";

export const dbMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dbUrl = config.dbUrl ?? "";
    req.app.locals.db = connectDB(dbUrl); // Inject the connection pool into req object
    console.log("Total connections:", req.app.locals.db.totalCount);
    console.log("Idle connections:", req.app.locals.db.idleCount);
    console.log("Waiting clients:", req.app.locals.db.waitingCount);
    next();
  } catch (error) {
    console.error("Error connecting to database:", error);
    return;
  }
};
