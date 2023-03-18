import products from "../models/products.model";
import { Request, Response } from "express";

class productsController {
  getAllProducts = async(req: Request, res: Response): Promise<void> => {
    try {
      const items = await products.find();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  saveProduct = async(req: Request, res: Response): Promise<void> => {
    try {
      const product = new products(req.body);
      await product.save();
      res.status(201).send({ message: "Produto cadastrado com sucesso" });
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - falha ao cadastrar produto` })
    }
  }

  getProductById = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const product = await products.findById(id);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - falha ao buscar produto` })
    }
  }

  updateProduct = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await products.findByIdAndUpdate(id, req.body)
      res.status(201).json({ message: 'Produto atualizado com sucesso' });
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - falha ao atualizar produto` })
    }
  }

  deleteProductById = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await products.findByIdAndDelete(id);
      res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - falha ao deletar produto` })
    }
  }
}

export default new productsController;