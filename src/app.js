import express from "express";
import initDatabase from "./database";

const app = express();

initDatabase();

app.use(express.json());
export default app;
