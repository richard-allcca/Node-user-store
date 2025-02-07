import { regularExp } from "../../../config/regular-exp";



export class RegisterUserDto {

  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ['Missing name', undefined];
    if (!email) return ['Missing email', undefined];
    if (regularExp.email.test(email) === false) return ['Invalid email', undefined];
    if (!password) return ['Missing password', undefined];
    if (regularExp.password.test(password) === false) return ['Invalid password', undefined];

    const newUserRegistration = new RegisterUserDto(name, email, password);

    return [undefined, newUserRegistration];
  }
}