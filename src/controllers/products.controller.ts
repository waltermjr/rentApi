import products from "../models/products.model";
import clients from "../models/clients.model";
import { Request, Response } from "express";
import _ from "lodash";

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

const productsController = {
    getAllProducts: async (req: Request, res: Response) => {
        try {
            const items = await products.find().populate("rentedByClient", ["name", "mail", "registerNumber"]);
            res.status(200).json(items);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    saveProduct: async (req: Request, res: Response) => {
        try{
            const product = new products(req.body);
            const productSaved = await product.save();
            await productsFacilities.updateProductInClient(productSaved, []);
            res.status(201).send({ message: "Produto cadastrado com sucesso" });
        } catch(err: any){
            res.status(500).send({ message: `${err.message} - falha ao cadastrar produto` })
        }
    },

    getProductById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try{
            const product = await products.findById(id).populate("rentedByClient",  ["name", "mail", "registerNumber"]);
            res.status(201).json(product);
        } catch(err: any) {
            res.status(500).send({ message: `${err.message} - falha ao buscar produto` })
        }
    },

    updateProduct: async (req: Request, res: Response) => {
        const { id } = req.params;
        try{
            const clientRentedOld = await products.findById(id)
            await products.findByIdAndUpdate(id, req.body)
            await productsFacilities.updateProductInClient({ id, ...req.body}, clientRentedOld!.rentedByClient)
            res.status(201).json({ message: 'Produto atualizado com sucesso'});
        } catch(err: any) {
            res.status(500).send({ message: `${err.message} - falha ao atualizar produto` })
        } 
    },

    deleteProductById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try{
            await products.findByIdAndDelete(id);
            res.status(200).json({ message: 'Produto deletado com sucesso'});
        } catch(err: any) {
            res.status(500).send({ message: `${err.message} - falha ao deletar produto` })
        } 
    }
}

const productsFacilities = {
    async updateProductInClient(productUpdatedData: any, clientRentedOld: any){
        const { rentedByClient, id: productId } = productUpdatedData;
        clientRentedOld.filter((e: any) => !rentedByClient.includes(e.toString()));
        const clientToRemove = clientRentedOld.filter((e: any) => !rentedByClient.includes(e.toString()));
        const clientToAdd = rentedByClient.filter((e: any) => !clientRentedOld.includes(e.toString()));

        if(rentedByClient.length > 0){
            const body = {
                productRented: productId,
            }

            clientToAdd.map(async (cliRented: any) => {
                await clients.findByIdAndUpdate(cliRented, body);
            });
        }

        if(clientToRemove.length > 0){
            await this.removeProductInClient(clientToRemove, productId);
        }
    },

    async removeProductInClient(clientToRemove: any, productId: String){
        clientToRemove.map(async (prodRentedToRemove: any) => {
            const client = await clients.findById(prodRentedToRemove)
            const prodRented = client!.productRented
            const newRenderedProduct = prodRented.map(e => e.toString())
            const nBody = _.remove(newRenderedProduct, (e: any) => e !== productId)
            const newbody = {
                productRented: nBody,
            }
            await clients.findByIdAndUpdate(prodRentedToRemove, newbody);
        })
    }
}

export default productsController;