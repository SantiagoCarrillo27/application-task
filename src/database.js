import mongoose from "mongoose";
import { MONGODB_URL } from "../config.js";



export const conexion = mongoose.connect(MONGODB_URL)
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));