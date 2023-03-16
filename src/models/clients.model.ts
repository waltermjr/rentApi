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

const clientsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  registerNumber: {
    type: Number,
    required: true,
  },
  productRented: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    default: [],
  }]
})

const clientsModel = mongoose.model<IClients>("clients", clientsSchema);

export default clientsModel