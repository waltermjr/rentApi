import mongoose from "mongoose";
import { User } from "../../../../entities/User";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
})

UserSchema.loadClass(User)

const UserModel = mongoose.model<User>("users", UserSchema);

export default UserModel