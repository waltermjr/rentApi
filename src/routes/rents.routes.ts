import express from "express";
import rentsController from "../controllers/rents.controller";

const router = express.Router();

router
  .get("/rents", rentsController.getAllRents)
  .get("/rents/:id", rentsController.getRentById)
  .post("/rents", rentsController.saveRent)
  .put("/rents/:id", rentsController.updateRent)
  .delete("/rents/:id", rentsController.deleteRentById)

export default router