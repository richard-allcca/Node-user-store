import { Request, Response } from "express";
import path from "path";


export class ImagesControllers {

  constructor() {}

  public getByImage = (req: Request, res: Response) => {
    const { type = '', image = '' } = req.params;

    const imagePath =  path.resolve(__dirname, `../../../uploads/${type}/${image}`);
    console.log("🚀 ~ ImagesControllers ~ imagePath:", imagePath)
    if( !imagePath ) {
      return res.status(404).send('Image not found');
    }

    res.sendFile(imagePath);

  }

  public getAllImages = (req: Request, res: Response) => {
    res.send('getAllImages');
  }

}