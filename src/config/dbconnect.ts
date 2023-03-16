import mongoose from "mongoose";
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wgffrca.mongodb.net/rent`);

let db = mongoose.connection;

export default db