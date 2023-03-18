import mongoose from "mongoose";
import { IRent } from "../types";

const rentSchema = new mongoose.Schema({
  id:{
    type: String,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    require: true,
  }],
  startAt: {
    type: Date,
    require: true,
  },
  endAt: {
    type: Date,
    require: true,
  }
})

const rentModel = mongoose.model<IRent>("rent", rentSchema);

export default rentModel