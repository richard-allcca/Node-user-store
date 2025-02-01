import { Request, Response } from "express";


export class AuthController {

  constructor(){}

  register(req: Request, res: Response) {

    res.json({message: 'register'});
  }

  loginUser(req: Request, res: Response) {

    res.json({message: 'login'});
  }

  validaEmail(req: Request, res: Response) {

    res.json({message: 'validate-email'});
  }
}