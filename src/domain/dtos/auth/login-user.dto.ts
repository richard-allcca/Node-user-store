import { regularExp } from "../../../config/regular-exp";



export class LoginUserDto {

  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static login(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Missing email', undefined];
    if (regularExp.email.test(email) === false) return ['Invalid email', undefined];
    if (!password) return ['Missing password', undefined];
    if (regularExp.password.test(password) === false) return ['Invalid password', undefined];

    const newUserRegistration = new LoginUserDto(email, password);

    return [undefined, newUserRegistration];
  }
}