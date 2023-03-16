import mongoose from "mongoose";

interface IClients {
  id: string,
  name: string,
  mail: string,
  registerNumber: string,
  productRented: IProduct[]
}

interface IProduct {
  id: string,
  name: string,
  rentedByClient: IClients[],
  quantity: string
}

const productsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  rentedByClient: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients",
    default: [],
  }],
  quantity: {
    type: Number,
    required: true,
  }
});

const productsModel = mongoose.model<IProduct>('products', productsSchema);

export default productsModel