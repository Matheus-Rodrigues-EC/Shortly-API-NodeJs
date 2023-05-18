import express from "express";
import cors from "cors";

const Delete = express();
Delete.use(cors());
Delete.use(express.json());

import { deleteById } from "../controllers/deleteByIdController.js";

Delete.delete("/urls/:id", deleteById);

export default Delete;