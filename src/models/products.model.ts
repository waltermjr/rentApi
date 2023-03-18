import mongoose from "mongoose";
import { IProduct } from "../types";

const productsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  foto: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    require: true,
  },
  size: {
    type: String,
    required: true,
  }
});

const productsModel = mongoose.model<IProduct>('products', productsSchema);

export default productsModel