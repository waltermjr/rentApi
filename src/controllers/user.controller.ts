import { Request, Response } from "express";
import user from "../models/user.model";

class userController {
  getAllUsers = async(req: Request, res: Response): Promise<void> => {
    try{
      const users = await user.find();
      res.status(201).json(users);
    } catch(err) {
      res.status(500).send({ message: `${err} - erro ao buscar usuários` });
    }
  }

  createUser = async(req: Request, res: Response): Promise<void> => {
    try{
      await this.verifyMailExist(req.body.mail || "");
      const newUser = new user(req.body);
      await newUser.save();
      res.status(201).send({ message: "Usuário criado com sucesso"});
    } catch(err) {
      res.status(500).send({ message: `${err} - erro ao criar usuário` });
    }
  }

  getUserById = async(req: Request, res: Response): Promise<void> => {
    try{
      const userData = await user.findById(req.params.id);
      res.status(201).json(userData);
    } catch(err) {
      res.status(500).send({ message: `${err} - erro ao criar usuário` })
    }
  }

  updateUser = async(req: Request, res: Response): Promise<void> => {
    try{
      await this.verifyMailExist(req.body.mail || "");
      await user.findByIdAndUpdate(req.params.id, req.body);
      res.status(201).send({ message: "Usuário atualizado com sucesso" });
    } catch(err) {
      res.status(500).send({ message: `${err} - erro ao criar usuário` })
    }
  }

  private verifyMailExist = async(mail: String): Promise<Error | void> => {
    const clientMail = await user.find({ "mail": mail });
    if (clientMail.length > 0) {
      throw new Error("Email já cadastrados")
    }
  }
}

export default new userController