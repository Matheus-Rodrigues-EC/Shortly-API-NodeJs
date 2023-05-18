import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import Post from "./routes/postRoutes.js";
import Get from './routes/getRoutes.js';
import Delete from './routes/deleteRoutes.js';

app.use(Post);
app.use(Get);
app.use(Delete);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running at port: ${process.env.PORT}`);
})