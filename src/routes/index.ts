import { Express } from "express-serve-static-core";
import userRouter from "./userRoutes";

const routes = (app: Express) => {
  app.use(
    userRouter
  )
}

export default routes