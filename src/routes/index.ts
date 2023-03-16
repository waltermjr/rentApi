import productsRouter from "./products.routes";
import clientsRouter from "./clients.routes";

const routes = (app: any) => {
  app.use(
    productsRouter,
    clientsRouter
  )
}

export default routes