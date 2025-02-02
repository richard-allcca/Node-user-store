import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user-model";
import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { UserEntity } from "../../domain/entities/entity";
import { CustomError } from "../../domain/errors/custom.error";


export class AuthService {

  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('User already exists');

    try {

      const newUser = new UserModel(registerUserDto);

      // Encriptar la contraseña
      newUser.password = bcryptAdapter.has(registerUserDto.password);

      await newUser.save();

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

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.badRequest('User not found');

    const isValidPassword = bcryptAdapter.compare(password, user.password);
    if (!isValidPassword) throw CustomError.badRequest('Invalid password');

    const payload = { email: user.email, _id: user._id };
    const token = JwtAdapter.generateToken(payload);
    if (!token) throw CustomError.internalServer('Error generating token');

    // Remover el password de la respuesta
    const { password: _, ...userEntity } = UserEntity.fromObject(user);

    return {
      user: userEntity,
      token,
    };
  }


}