import express, {
  urlencoded,
  json,
} from "express";
import cors from "cors";
import paymentRouter from "./routes/payment-route.js";
import { corsConfiguration } from "./configurations/cors.js";


const app = express();
app.use(urlencoded({ extended: true }));
app.use(cors(corsConfiguration()));

app.use(express.json());
app.use("/api/payment", json(), paymentRouter);
app.get("/", (req, res) => {
  console.log("Welcome to Payment & TypeScript Server");
  res.send("Welcome to Payment & TypeScript Server");
});

export default app;