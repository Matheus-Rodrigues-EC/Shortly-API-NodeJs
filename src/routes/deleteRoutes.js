import express from "express";
import cors from "cors";

const Delete = express();
Delete.use(cors());
Delete.use(express.json());

import { deleteById } from "../controllers/deleteByIdController.js";
import { deleteSession } from "../controllers/deleteSessionController.js";

Delete.delete("/urls/:id", deleteById);
Delete.delete("/home/session", deleteSession);

export default Delete;