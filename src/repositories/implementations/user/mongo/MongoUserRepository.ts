import { User } from "../../../../entities/User";
import { IUserRepository } from "../protocols/IUserRepository";
import mongoose from "mongoose";

export class MongoUserRespository implements IUserRepository {
  constructor(
    private UserModel: mongoose.Model<User>
  ){}

  async save(user: User): Promise<void> {
    const newUser = new this.UserModel(user)
    await newUser.save()
  }

  async update(id: string, user: User): Promise<void> {
    await this.UserModel.findByIdAndUpdate(id, user)
  }

  async delete(id: string): Promise<void> {
    await this.UserModel.findByIdAndDelete(id)
  }

  async getAll(): Promise<User[]> {
    const getAllUsers = await this.UserModel.find()
    return getAllUsers
  }

  async findByEmail(email: string): Promise<User[]> {
    const getUser = await this.UserModel.find({"email": email})
    return getUser
  }

  async findById(id: string): Promise<User> {
    const getUser = await this.UserModel.findById(id)
    if(!getUser){
      throw new Error("Usuário não encontrado")
    }
    return getUser
  }
}