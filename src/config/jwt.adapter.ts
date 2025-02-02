import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

  static async generateToken(payload: any, duration: SignOptions['expiresIn'] = '2h') {

    return new Promise((resolve, reject) => {

      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) resolve(null);

        resolve(token);
      });
    });

  }

  public async validateToken(token: string, secret: Secret) {
    return jwt.verify(token, secret);
  }
}