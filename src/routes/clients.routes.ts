import express from "express";
import clientsController from "../controllers/clients.controller";

const router = express.Router();

router
  .get("/clients", clientsController.getAllClients)
  .get("/clients/:id", clientsController.getClientById)
  .post("/clients", clientsController.saveClient)
  .put("/clients/:id", clientsController.updateClient)
  .delete("/clients/:id", clientsController.deleteClientById)

export default router