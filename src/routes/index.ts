import productsRouter from "./products.routes";
import clientsRouter from "./clients.routes";
import rentsRouter from "./rents.routes"

const routes = (app: any) => {
  app.use(
    productsRouter,
    clientsRouter,
    rentsRouter
  )
}

export default routes