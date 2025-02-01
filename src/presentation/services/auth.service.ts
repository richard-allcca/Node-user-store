import { UserModel } from "../../data/mongo/models/user-model";
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

      await newUser.save();

      // Paso intermedio para no enviar el _id y el password en la respuesta
      const {password, ...userEntity} = UserEntity.fromObject(newUser);

      return {
        user: userEntity,
        token: 'token'
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}