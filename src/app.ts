import express, { Express } from "express";
import db from './config/dbconnect';
import routes from "./routes";

db.on("erro", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log("DataBase connected!")
});

const app: Express = express();
app.use(express.json());
routes(app);

export default app;