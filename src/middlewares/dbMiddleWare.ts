// Assuming you're using pg
import { NextFunction, Request, Response } from "express";
import { Pool } from "pg";

export const dbMiddleware = (dbService: Pool) => {
  return  function (req: Request,
    res: Response,
    next: NextFunction) {
    try {
      req.app.locals.db = dbService; // Inject the connection pool into req object
      console.log("Total connections:", req.app.locals.db.totalCount);
      console.log("Idle connections:", req.app.locals.db.idleCount);
      console.log("Waiting clients:", req.app.locals.db.waitingCount);
      next();
    } catch (error) {
      console.error("Error connecting to database:", error);
      return;
    }
  };
}
