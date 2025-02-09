import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { CustomError } from "../../domain/errors/custom.error";
import { UserModel } from "../../data/mongo/models/user-model";


export class AuthMiddleware {


  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    const authorizationToken = req.header('Authorization');

    if (!authorizationToken) {
      return res.status(401).json({ message: 'No token provided' });
    }

    if (!authorizationToken.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid Bearer token' });
    }

    // const token = authorizationToken.split(' ').at(-1);
    const token = authorizationToken.split(' ')[1];

    try {
      const payload = await JwtAdapter.validateToken<{id: string}>(token);
      if (!payload) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const { id } = payload;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // TODO - Validar si el usuario está activo

      req.body.user = user;

      next();

    } catch (error) {
      console.error(`${error}`);
      return new CustomError(500,'Internal server error - validateJWT');
    }
  }
}