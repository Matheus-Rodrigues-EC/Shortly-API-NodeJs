import express from "express";
import cors from "cors";

const Get = express();
Get.use(cors());
Get.use(express.json());

// Imports of get url by id
import { getUrlById } from "../controllers/getUrlByIdController.js";

// import get Me
import { getMe } from "../controllers/getMeController.js";

Get.get("/urls/:id", getUrlById);
Get.get("/urls/open/:shortUrl");
Get.get("/users/me", getMe);
Get.get("/ranking");

export default Get;