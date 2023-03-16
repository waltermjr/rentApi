import clients from "../models/clients.model";
import products from "../models/products.model";
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

const clientsController = {
    getAllClients: async (req: Request, res: Response) => {
        try {
            const items = await clients.find().populate("productRented", ["name", "mail","registerNumber"]);
            res.status(200).json(items);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    saveClient: async (req: Request, res: Response) => {
        try {
            const client = new clients(req.body);
            const isRegisterNumberUsed = await clientsFacilities.verifyRegisterNumberAndMail(req.body)

            if(isRegisterNumberUsed){
                res.status(500).send({ message: `Registro já cadastrado` })
                return
            }

            const resultClient = await client.save();
            await clientsFacilities.updateClientInProduct(resultClient, []);
            res.status(201).send({ message: 'Cliente criado com sucesso' });
        } catch (err: any) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar cliente` })
        }
    },

    getClientById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const client = await clients.findById(id).populate("productRented");
            res.status(201).json(client);
        } catch (err: any) {
            res.status(500).send({ message: `${err.message} - falha ao buscar cliente` })
        }
    },

    updateClient: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const productRentedOld = await clients.findById(id)
            await clients.findByIdAndUpdate(id, req.body)
            await clientsFacilities.updateClientInProduct({ id, ...req.body }, productRentedOld?.productRented)
            res.status(201).json({ message: 'Cliente atualizado com sucesso' });
        } catch (err: any) {
            console.log()
            res.status(500).send({ message: `${err.message} - falha ao atualizar cliente` })
        }
    },

    deleteClientById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await clients.findByIdAndDelete(id);
            res.status(200).json({ message: 'Cliente deletado com sucesso' });
        } catch (err: any) {
            res.status(500).send({ message: `${err.message} - falha ao deletar cliente` })
        }
    }
}

const clientsFacilities = {
    async updateClientInProduct(clientUpdatedData: IClients, productRentedOld: any) {
        const { productRented, id: clientId } = clientUpdatedData;
        productRentedOld.filter((e: any) => !productRented.includes(e.toString()));
        const productToRemove = productRentedOld.filter((e: any) => !productRented.includes(e.toString()));
        const productToAdd = productRented.filter((e: any) => !productRentedOld.includes(e.toString()));
        
        if (productRented.length > 0) {
            const body = {
                rentedByClient: clientId,
            }
            
            productToAdd.map(async (prodRented: any) => {
                await products.findByIdAndUpdate(prodRented, body);
            })
        } 
        
        if(productToRemove.length > 0){
            await this.removeClientInProduct(productToRemove, clientId);
        }
    },
    
    async removeClientInProduct(productToRemove: any, clientId: String){
        productToRemove.map(async (prodRentedToRemove: any) => {
            const product = await products.findById(prodRentedToRemove)
            const rentedByClientProduct = product!.rentedByClient
            const newRenderedClient = rentedByClientProduct.map(e => e.toString())
            const nBody = _.remove(newRenderedClient, (e: any) => e !== clientId)
            const newbody = {
                rentedByClient: nBody,
            }
            await products.findByIdAndUpdate(prodRentedToRemove, newbody);
        })
    },

    async verifyRegisterNumberAndMail(clientData: any){
        const { registerNumber, mail } = clientData;
        const clientsRN = await clients.find( {$or: [{"registerNumber": registerNumber }, { "mail": mail }]});
        if(clientsRN.length > 0){
            return true
        }

        return false
    }
}

export default clientsController;