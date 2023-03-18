import mongoose from "mongoose";
import { IClients } from "../types";

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
  phone: {
    type: String,
    required: true,
  },
  registerNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  }
})

const clientsModel = mongoose.model<IClients>("clients", clientsSchema);

export default clientsModel