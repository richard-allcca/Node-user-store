import { CreateCategoryDto } from '../domain/dtos/category/create-category.dto';
import { UserEntity } from '../domain/entities/entity';
import { CustomError } from '../domain/errors/custom.error';
import { CategoryModel } from './../data/mongo/models/category.model';

export class CategoryService {

  constructor() {}

  public createCategory = async (categoryDto: CreateCategoryDto, user: UserEntity) => {
    const categoryExist = await CategoryModel.findOne({ name: categoryDto.name });

    if (categoryExist) throw CustomError.badRequest('Category already exists');

    try {
      const newCategory = new CategoryModel({
        ...categoryDto,
        user: user.id,
      });

      await newCategory.save();

      const { _id, name, available } = newCategory;

      const result = {
        id: _id,
        name: name,
        available: available,
      }

      return result;

    } catch (error) {
      throw CustomError.internalServer('Error creating category');
    }
  }

  public async getAllCategories() {

    try {

      const categories = await CategoryModel.collection.find().toArray();

      const resultFiltered =  categories.map((category) => {
        return {
          id: category._id,
          name: category.name,
          available: category.available,
        }
      });

      return resultFiltered;

    } catch (error) {
      throw CustomError.internalServer('Error getting all categories');
    }
  }
}
