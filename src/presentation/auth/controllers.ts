import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.error";
import { LoginUserDto } from "../../domain/dtos/login-user.dto";


export class AuthController {

  constructor(
    public readonly authService: AuthService
  ){
    this.register = this.register.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.validaEmail = this.validaEmail.bind(this);
  }

  register(req: Request, res: Response) {
    const [ error, registerDto ] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({message: error})

    this.authService.registerUser(registerDto!)
    .then( user => res.json(user) )
    .catch( error => this.handleError(error, res) );
  }

  loginUser(req: Request, res: Response) {
    const [ error, loginUserDto ] = LoginUserDto.login(req.body);

    if (error) return res.status(400).json({message: error});

    this.authService.loginUser(loginUserDto!)
    .then( user => res.json(user) )
    .catch( error => this.handleError(error, res) );
  }

  validaEmail(req: Request, res: Response) {

    res.json({message: 'validate-email'});
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({message: error.message});
    }

    console.error(`${error}`);
    return res.status(500).json({message: 'Internal server error'});
  }
}