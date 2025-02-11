import { Request, Response } from "express";
import { FileUploadService } from "../../services/fileUpload.service";
import { UploadedFile } from "express-fileupload";
import { CustomError } from "../../domain/errors/custom.error";



export class FileUploadController {

  constructor(
    private readonly fileUploadService: FileUploadService
  ) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }

  uploadSingleFile = (req: Request, res: Response) => {
    const type = req.params.type;

    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadService.uploadSingleFile(file, `uploads/${type}`)
      .then(file => res.status(200).json(file))
      .catch(error => this.handleError(res, error));

  }

  uploadMultipleFiles = (req: Request, res: Response) => {
    const type = req.params.type;

    const files = req.body.files as UploadedFile[];

    this.fileUploadService.uploadMultipleFile(files, `uploads/${type}`)
      .then(files => res.status(200).json(files))
      .catch(error => this.handleError(res, error));

  }
}