import express from "express";
import cors from "cors";

const Delete = express();
Delete.use(cors());
Delete.use(express.json());

Delete.delete("/urls/:id");

export default Delete;