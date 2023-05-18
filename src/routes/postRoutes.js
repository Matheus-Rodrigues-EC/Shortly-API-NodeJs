import express from "express";
import cors from "cors";

const Post = express();
Post.use(cors());
Post.use(express.json());

// imports of signUp Route
import { signUp } from "../controllers/signUpController.js";
import signUpValidation from "../middlewares/signUpMiddleware.js";

// Imports of signIn Route
import { signIn } from "../controllers/signInController.js";
import signInValidate from "../middlewares/signInMiddleware.js";

// Imports of shortened urls
import { shortener } from "../controllers/shortenerController.js";
import shortenerValidate from "../middlewares/shortenerMiddleware.js";

Post.post("/signup", signUpValidation, signUp);
Post.post("/signin", signInValidate, signIn);
Post.post("/urls/shorten", shortenerValidate, shortener);

export default Post;