import express from "express";
import cors from "cors";

const Get = express();
Get.use(cors());
Get.use(express.json());

// Imports of get url by id
import { getUrlById } from "../controllers/getUrlByIdController.js";

Get.get("/urls/:id", getUrlById);
Get.get("/urls/open/:shortUrl");
Get.get("/users/me");
Get.get("/ranking");

export default Get;