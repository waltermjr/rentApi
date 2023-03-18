import { Express } from "express-serve-static-core";
import productsRouter from "./products.routes";
import clientsRouter from "./clients.routes";
import rentsRouter from "./rents.routes";
import userRouter from "./user.routes";

const routes = (app: Express) => {
  app.use(
    productsRouter,
    clientsRouter,
    rentsRouter,
    userRouter
  )
}

export default routes