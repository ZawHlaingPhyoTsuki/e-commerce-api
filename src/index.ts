import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found";

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.APP_ENV == "developement" ? "*" : process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api", router)
app.get("/", (req ,res)=> {
  res.send("E-Commerce API")
})

// Not Found Middleware
app.use(notFoundHandler)

// Error Handler Middleware
app.use(errorHandler)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
})
