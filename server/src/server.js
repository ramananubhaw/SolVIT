import cron from "node-cron";
import axios from "axios";
import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import {fileURLToPath} from "url"; // dirname
import {dirname, resolve} from "path"; // dirname
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRoutes.js";

// configuring path to environment variables
const __filename = fileURLToPath(import.meta.url); // points to current file
const __dirname = dirname(__filename); // points to the current directory
dotenv.config({path: resolve(__dirname,"../.env")})

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN, // Vite's default port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

// Setting up the routers
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("<h1>Welcome to SolVIT!!!</h1> <h2>VIT's very own online portal for its hostellers to register and resolve complaints.</h2>")
});

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}.`);
        // const {label, score} = await categorizeComplaint("AC not cooling properly.");
        // console.log(label, score);
        cron.schedule("*/10 * * * *", async () => {
            try {
                // Ping backend
                const res1 = await axios.get(process.env.SERVER_URL);
                console.log("Server ping executed:", res1.status, res1.statusText);

                // Ping frontend
                const res2 = await axios.get(process.env.CLIENT_URL);
                console.log("Client ping executed:", res2.status, res2.statusText);
            }
            catch (err) {
                console.error("Cron job failed:", err.message);
            }
        });
    })
})
.catch(error => {
    console.log(error)
});