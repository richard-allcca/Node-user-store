import { bcryptAdapter } from "../config/bcrypt.adapter";
import { JwtAdapter } from "../config/jwt.adapter";
import { UserModel } from "../data/mongo/models/user-model";
import { LoginUserDto } from "../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../domain/dtos/register-user.dto";
import { UserEntity } from "../domain/entities/entity";
import { CustomError } from "../domain/errors/custom.error";
import { sendMailValidationLink } from "../domain/use-cases/SendMailValidationLink";

export class AuthService {

  constructor(
    private readonly mailValidationLink: sendMailValidationLink,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('User already exists');

    try {

      // Crear un nuevo usuario
      const newUser = new UserModel(registerUserDto);

      // Encriptar la contraseña
      newUser.password = bcryptAdapter.has(registerUserDto.password);

      // Guardar el nuevo usuario
      await newUser.save();

      // Email de validación
      await this.mailValidationLink.send(registerUserDto.email);

      // Paso intermedio para no enviar el _id y el password en la respuesta
      const { password, ...userEntity } = UserEntity.fromObject(newUser);

      return {
        user: userEntity,
        token: 'token'
      };

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Validar si el usuario existe
    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.badRequest('User not found');

    // Validar la contraseña
    const isValidPassword = bcryptAdapter.compare(password, user.password);
    if (!isValidPassword) throw CustomError.badRequest('Invalid password');

    // Generar el token
    const payload = { _id: user._id };
    const token = await JwtAdapter.generateToken(payload);
    if (!token) throw CustomError.internalServer('Error generating token');

    // Remover el password de la respuesta
    const { password: _, ...userEntity } = UserEntity.fromObject(user);

    return {
      user: userEntity,
      token,
    };
  }

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token)

    if (!payload) throw CustomError.unauthorized('Invalid token');

    const { email } = payload as { email: string };
    if (!email) throw CustomError.badRequest('Invalid email');

    const user = await UserModel.findOne({email});
    if (!user) throw CustomError.badRequest('User not found');

    user.emailValidated = true;

    await user.save();

    return true;
  }

}