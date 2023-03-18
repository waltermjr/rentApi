import express from "express"
import userController from "../controllers/user.controller";

const Router = express.Router();

Router
  .get("/user/", userController.getAllUsers)
  .get("/user/:id", userController.getUserById)
  .post("/user", userController.createUser)
  .put("/user/:id", userController.updateUser)

export default Router