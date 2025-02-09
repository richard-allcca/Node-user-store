import { Validators } from "../../../config/validators";


export class CreateProductDto {

  constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string,
  ) {}

  static create(object: { [key: string]: any; }): [string?, CreateProductDto?] {
    const {
      name,
      available,
      price,
      description,
      user,
      category,
    } = object;

    let availableBoolean = available;

    if (typeof available !== 'boolean') {
      availableBoolean = (available === 'true');
    }
    if (!name) {
      return ['name is required', undefined];
    }
    if (!price) {
      return ['price is required', undefined];
    }
    if (!description) {
      return ['description is required', undefined];
    }
    if (!user) {
      return ['user is required', undefined];
    }
    if (!Validators.isMongoId(user)) {
      return ['user is invalid', undefined];
    }
    if (!category) {
      return ['category is required', undefined];
    }
    if (!Validators.isMongoId(category)) {
      return ['category is invalid', undefined];
    }


    return [
      undefined,
      new CreateProductDto(
        name, availableBoolean, price, description, user, category
      )
    ];
  }
}