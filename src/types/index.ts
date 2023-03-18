interface IClients {
  _id: String,
  name: String,
  mail: String,
  registerNumber: String,
  phone: String,
  address: IAddress[],
}

interface IAddress {
  zipCode: String,
  street: String,
  neighborhood: String,
  city: String,
  state: String,
  number: String,
}

interface IProduct {
  _id: String,
  name: String,
  code: String,
  foto: String,
  value: Number,
  size: String,
}

interface IRent {
  _id: String,
  client: IClients,
  product: IProduct[],
  startRent: Date,
  endRent: Date,
}

export { IClients, IProduct, IRent }