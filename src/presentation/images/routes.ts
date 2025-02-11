import { Router } from "express";
import { ImagesControllers } from "./controllers";

export class ImagesRoutes {

  static get routes(): Router {
    const router = Router();

    const controller = new ImagesControllers();

    // Definir las rutas
    router.get('/:type/:image', controller.getByImage );

    router.get('/:type/', controller.getAllImages );

    return router;

  }

}