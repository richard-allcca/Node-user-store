import { Router } from "express";
import { AuthController } from "./controllers";


export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const controller = new AuthController();

    // Definir las rutas
    router.post('/login', controller.loginUser );

    router.post('/register', controller.register );

    router.get('/validate-email/:token', controller.validaEmail );

    return router;
  }

}