import { Router } from "express";
import { FileUploadController } from "./controllers";
import { FileUploadService } from "../../services/fileUpload.service";
import { FileUploadMiddleware } from "../middlewares/fileUpload.middlewares";


export class FileUploadRouter {


  static get routes(): Router {
    const router = Router();

    const fileUploadService = new FileUploadService();

    const controller = new FileUploadController(fileUploadService);

    // Definir las rutas primero
    router.post(
      '/single/:type',
      [
        FileUploadMiddleware.containFiles,
        FileUploadMiddleware.validTypes,
      ],
      controller.uploadSingleFile
    );

    router.post(
      '/multiple/:type',
      [
        FileUploadMiddleware.containFiles,
        FileUploadMiddleware.validTypes,
      ],
      controller.uploadMultipleFiles
    );

    return router;
  }

}