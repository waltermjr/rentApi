import { Request, Response } from "express";
import clients from "../models/clients.model";
import { IClients } from "../types";

class clientsController {

  getAllClients = async(req: Request, res: Response): Promise<void> => {
    try {
      const items = await clients.find();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  saveClient = async(req: Request, res: Response): Promise<void> => {
    try {
      const client = new clients(req.body);
      await this.verifyRequiredFields(req.body)
      await client.save();
      res.status(201).send({ message: 'Cliente criado com sucesso' });
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - falha ao cadastrar cliente` })
    }
  }

  getClientById = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const client = await clients.findById(id);
      res.status(201).json(client);
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - falha ao buscar cliente` })
    }
  }

  updateClient = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const { registerNumber, ...rest } = req.body;
      await this.verifyMailExist(rest.mail || "");
      await clients.findByIdAndUpdate(id, rest);
      res.status(201).json({ message: 'Cliente atualizado com sucesso' });
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - falha ao atualizar cliente` })
    }
  }

  deleteClientById = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await clients.findByIdAndDelete(id);
      res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - falha ao deletar cliente` })
    }
  }

  private verifyRequiredFields = async(clientData: IClients): Promise<Error | void> => {
    const { registerNumber, mail } = clientData;
    const clientsRN = await clients.find({ $or: [{ "registerNumber": registerNumber }, { "mail": mail }] });

    if (clientsRN.length > 0) {
      throw new Error("Email/CPF já cadastrados")
    }
  }
  
  private verifyMailExist = async(mail: String): Promise<Error | void> => {
    const clientMail = await clients.find({ "mail": mail });
    if (clientMail.length > 0) {
      throw new Error("Email já cadastrados")
    }
  }
}

export default new clientsController;