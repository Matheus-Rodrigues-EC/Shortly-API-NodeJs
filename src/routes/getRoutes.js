import express from "express";
import cors from "cors";

const Get = express();
Get.use(cors());
Get.use(express.json());

// Imports of get url by id
import { getUrlById } from "../controllers/getUrlByIdController.js";

// Imports of openUrl
import { openShortUrl } from "../controllers/openShortUrlController.js";

// import of get Me
import { getMe } from "../controllers/getMeController.js";

// import of ranking
import { ranking } from "../controllers/rankingController.js";

Get.get("/urls/:id", getUrlById);
Get.get("/urls/open/:shortUrl", openShortUrl);
Get.get("/users/me", getMe);
Get.get("/ranking",ranking);

export default Get;