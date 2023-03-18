import rent from "../models/rent.model";
import { Request, Response } from "express";

class rentController {
  getAllRents = async(req: Request, res: Response): Promise<void> => {
    try {
      const items = await rent.find().populate("client",["name","registerNumber","mail"]).populate("product",["name","code"]);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  saveRent = async(req: Request, res: Response): Promise<void> => {
    const { startAt, endAt } = req.body;
    try {
      const newRent = new rent(req.body);
      this.validDates(startAt, endAt);
      await newRent.save();
      res.status(200).send({message: "Pedido salvo com sucesso"})
    } catch(err: any){
      res.status(500).send({ message: `${err.message} - falha ao salvar pedido` })
    }
  }

  getRentById = async(req: Request, res: Response): Promise<void> => {
    try {
      const items = await rent.findById(req.params.id);
      res.status(201).json(items);
    } catch(err: any) {
      res.status(500).send({ message: `${err.message} - falha ao buscar pedido` })
    } 
  }

  updateRent = async(req: Request, res: Response): Promise<void> => {
    const { startAt, endAt } = req.body;
    try {
      this.validDates(startAt, endAt);
      await rent.findByIdAndUpdate(req.params.id, req.body);
      res.status(201).send({ message: 'Pedido atualizado com sucesso' });
    } catch(err: any) {
      res.status(500).send({ message: `${err.message} - falha ao alterar pedido` })
    } 
  }

  deleteRentById = async(req: Request, res: Response): Promise<void> => {
    try {
      await rent.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: 'Pedido deletado com sucesso' });
    } catch(err: any) {
      res.status(500).send({ message: `${err.message} - falha ao remover pedido` })
    } 
  }

  private validDates = (date1: String, date2: String): Error|void => {
    const newDate1 = date1;
    const newDate2 = date2;
    const dateNow = new Date().toISOString();

    if(newDate1 > newDate2 || newDate1 < dateNow){
      throw new Error("Datas inválidas")
    }
  }
}

export default new rentController;