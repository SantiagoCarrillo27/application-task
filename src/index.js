import express from "express";
import {conexion} from "./database.js";
import {router} from "./routes/index.js";
import cors from "cors";
import {PORT} from "../config.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',router)
app.listen(PORT)

console.log('Server started on port', PORT) 