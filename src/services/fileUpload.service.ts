import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { CustomError } from "../domain/errors/custom.error";
import { Uuid } from '../config/uuid.adapter';


export class FileUploadService {

  constructor(
    private readonly uuid = Uuid
  ) {}

  private checkFolder = async (folderPath: string) => {
    if (!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath)
    }
  };

  public uploadSingleFile = async (
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif']
  ) => {

    try {
      const fileExtension = file.mimetype.split('/')[1];
      const isValidExtension = validExtensions.includes(fileExtension);
      if (!isValidExtension) {
        throw CustomError.badRequest(
          `Invalid file extension. Valid extensions are ${validExtensions.join(', ')}`
        );
      }

      // const destination = path.join(__dirname, `../../${folder}`);
      const destination = path.join(__dirname, '../../' , folder);

      this.checkFolder(destination);

      const fileName = `${this.uuid.generate()}.${fileExtension}`;

      file.mv(`${destination}/${fileName}`);

      return { message: "upload file", name: fileName };

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  };

  public uploadMultipleFile = async (
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif']
  ) => {

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        return await this.uploadSingleFile(file, folder, validExtensions);
      })
    )

    return { message: "upload files", uploadedFiles };

  };

}