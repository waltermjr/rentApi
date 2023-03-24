import express, { Request, Response } from "express"
import createUser from "../useCases/User/CreateUser"
import updateUser from "../useCases/User/UpdateUser"
import deleteUser from "../useCases/User/DeleteUser"
const Router = express.Router();

Router
  .post("/user", (request: Request, response: Response) => createUser.handle(request, response))
  .put("/user/:id", (request: Request, response: Response) => updateUser.handle(request, response))
  .delete("/user/:id", (request: Request, response: Response) => deleteUser.handle(request, response))

export default Router