import express from "express";
import cors from "cors";

const Post = express();
Post.use(cors());
Post.use(express.json());

import { signUp } from "../controllers/signUpController.js";
import signUpValidation from "../middlewares/signUpMiddleware.js";

Post.post("/signup", signUpValidation, signUp);
Post.post("/signin");
Post.post("/urls/shorten");

export default Post;