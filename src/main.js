import express from "express";
import bodyParser from "body-parser";
import {appConfig} from "./config/app.config.js";
import {routes} from "./routes/index.js";



const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1", routes)

app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Listening on ${appConfig.port}`);
});








