import express from "express";
import { config } from "dotenv";
import vendorRoutes from './routes/vendorRoutes.js'
import varientRoutes from "./routes/varientRoutes.js"
import bodyParser from "body-parser";
import cors from "cors"

config({
  path: "./data/config.env",
});

export const app = express();
app.use(bodyParser.json());


// congig.env file must be define 1st on the top to use the env variable. otherwiste face env varable not work.


app.use(
  cors({
    origin: [process.env.FE_URL, "http://localhost:3000","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
  
);

// to use CORS everywhare use only app.use(cors()); and its done.

// app.use(cors({
//   origin: '*',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));



//Using Routes
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/varient", varientRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

