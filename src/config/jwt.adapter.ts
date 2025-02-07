import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

  static generateToken(payload: any, duration: SignOptions['expiresIn'] = '2h') {

    return new Promise((resolve, reject) => {

      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) reject(err);

        resolve(token);
      });
    });

  }

  static validateToken<T>(token: string): Promise<T | null> {

    return new Promise((resolve, reject) => {

      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) resolve(null);

        if (decoded && typeof decoded !== 'string' && '_id' in decoded) {
          (decoded as jwt.JwtPayload).id = (decoded as jwt.JwtPayload)['_id'];
        }

        resolve(decoded as T);
      });
    });
  }
}
