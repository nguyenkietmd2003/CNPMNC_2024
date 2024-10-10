import express from "express";
import cors from "cors";
import { configEngine } from "./src/config/configEngine.js";
import { sequelize } from "./src/config/database.js";
import apiRouter from "./src/routes/api.js";
const app = express();
const port = 8000 || 8888;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
configEngine(app);

app.use(apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

(async () => {
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(`>>> Error to connect to the database:" ${error}`);
  }
})();
