import express, { urlencoded, json } from "express";
import { config } from "dotenv";

import { TodoRoutes } from "./routes";

config();
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(TodoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
