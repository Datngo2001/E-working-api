import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { CLIENT_URL, DATABASE_URL, PORT } from "./config";
import UserRouter from "./routes/user.route";
import AuthRouter from "./routes/auth.route";
import authenMiddleware from "./middlewares/authen.middleware";
import ProjectRouter from "./routes/project.route";
import StageRouter from "./routes/stage.route";
import BoardRouter from "./routes/board.route";
import ColumnRouter from "./routes/column.route";
import TaskRouter from "./routes/task.route";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { ServiceAccount } from "firebase-admin";
import { FirebaseAccount } from "./config";

mongoose.connect(DATABASE_URL);
const database = mongoose.connection;
database.on("error", (error) => console.log(error));
database.once("open", () => console.log("Connected to database"));

const account: ServiceAccount = {
  projectId: FirebaseAccount.project_id,
  privateKey: FirebaseAccount.private_key,
  clientEmail: FirebaseAccount.client_email,
};
initializeApp({
  credential: cert(account),
  serviceAccountId: FirebaseAccount.client_email,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(authenMiddleware);

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/project", ProjectRouter);
app.use("/stage", StageRouter);
app.use("/board", BoardRouter);
app.use("/column", ColumnRouter);
app.use("/task", TaskRouter);

app.listen(PORT, () => {
  console.log("Server started");
});
