import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoute from "./router/web.js";
//import connection from "./configs/connectDB.js";
require("dotenv").config();

const app = express();
const port = process.env.port || 8080;
console.log("Port", port);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});