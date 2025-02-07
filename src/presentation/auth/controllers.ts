import { Request, Response } from "express";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthService } from "../../services/auth.service";


export class AuthController {

  constructor(
    public readonly authService: AuthService,
  ) {
    this.register = this.register.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.validaEmail = this.validaEmail.bind(this);
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(`${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  };

  // Registro de usuario
  register = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    this.authService.registerUser(registerDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(error, res));
  };

  // Inicio de sesión
  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);

    if (error) return res.status(400).json({ message: error });

    this.authService.loginUser(loginUserDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(error, res));
  };

  // Validar email
  validaEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService.validateEmail(token)
      .then(() => res.json({ message: 'Email validated' }))
      .catch(error => this.handleError(error, res));
  };
}