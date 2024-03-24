import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import { connectDB } from "./config/db";
import userRouter from "./resources/user/user.routes";
import UserRepository from "./resources/user/user.repository";

export interface RootResponse {
  message: string;
}

const app: Application = express();
const PORT = config.PORT;

app.use(cors());
app.use(compression());
// parse json data from client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));



app.get("/", (req: Request, res: Response<RootResponse>) => {
  return res.status(200).json({
    message: "Welcome to wayfarer API",
  });
});

const db = connectDB(config.dbUrl ?? '')
const userRepo = new UserRepository(db)
app.use("/api/v1", userRouter(userRepo));

export const server = app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});

process.on("SIGTERM", () => {
  console.info("SIGTERM signal recived: Shuting down server");

  // perfomr clean up task here

  server.close(() => {
    db.end()
    console.info("server is shutdown");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.info("SIGINT signal received: Shuting down server");

  // perfomr clean up task here
  server.close(() => {
    db.end()
    console.info("server is shutdown");
    process.exit(0);
  });
});
