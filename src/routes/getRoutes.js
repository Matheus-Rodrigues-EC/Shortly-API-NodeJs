import express from "express";
import cors from "cors";

const Get = express();
Get.use(cors());
Get.use(express.json());

Get.get("/urls/:id");
Get.get("/urls/open/:shortUrl");
Get.get("/users/me");
Get.get("/ranking");

export default Get;