import { NextFunction, Request, Response } from "express";


export class FileUploadMiddleware {


  static containFiles = (req: Request, res: Response, next: NextFunction) => {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json("No files were uploaded.");
    }

    // Cuando se sube un solo archivo, req.files.file es un objeto
    if (!Array.isArray(req.files.file)) {
      // Si es un objeto lo convertimos en un array y lo asignamos a req.body.files
      req.body.files = [req.files.file];
    } else {
      // Si ya es un array lo asignamos a req.body.files
      req.body.files = req.files.file;
    }

    next();
  };

  static validTypes = (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type;

    const validTypes = ['users', 'products', 'categories'];

    if (!validTypes.includes(type)) {
      return res.status(400).json(`Invalid type: ${type}, valid types are ${validTypes.join(', ')}`);
    }


    next();
  }

}