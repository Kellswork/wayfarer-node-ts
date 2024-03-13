import express, { Application, Request, Response } from "express";
import config from "./config";
import { connectDB } from "./config/db";

export interface RootResponse {
  message: string;
}

const app: Application = express();
const PORT = config.PORT;

app.get("/", (req: Request, res: Response<RootResponse>) => {
  res.status(200).json({
    message: "Welcome to wayfarer API",
  });
});
const dbUrl = config.dbUrl ?? "";
// does this close every pool instance created?
const { pool } = connectDB( dbUrl);

export const server = app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});

process.on("SIGTERM", () => {
  console.info("SIGTERM signal recived: Shuting down server");

  // perfomr clean up task here
  pool.end(() => {
    console.info("Database Pool has been closed");
  });

  server.close(() => {
    console.info("server is shutdown");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.info("SIGINT signal received: Shuting down server");

  // perfomr clean up task here
  pool.end(() => {
    console.info("Database Pool has been shut down");
  });

  // perfomr clean up task here
  server.close(() => {
    console.info("server is shutdown");
    process.exit(0);
  });
});
