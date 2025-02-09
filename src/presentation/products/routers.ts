import { Router } from "express";
import { ProductController } from "./controllers";
import { ProductService } from "../../services/product.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class ProductRoutes {

  static get routes(): Router {
    const router = Router();

    const productService = new ProductService();

    const controller = new ProductController(productService);

    // Definir las rutas
    router.get('/:id', controller.getByIdProduct);
    router.put('/:id', controller.updateProduct);
    router.delete('/:id', controller.deleteProduct);

    router.get('/', controller.getAllProducts);

    router.post(
      '/',
      [
        AuthMiddleware.validateJWT
      ],
      controller.createProduct
    );

    return router;
  }
}