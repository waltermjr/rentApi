import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";

const port = process.env.PORT || 3000;
import db from './src/config/dbconnect';

db.on("erro", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log("DataBase connected!")
});
app.listen(port, () => console.log("Server is running!"))
