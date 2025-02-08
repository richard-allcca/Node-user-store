import { CreateCategoryDto } from '../domain/dtos/category/create-category.dto';
import { PaginationDto } from '../domain/dtos/shared/pagination.dto';
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
      };

      return result;

    } catch (error) {
      throw CustomError.internalServer('Error creating category');
    }
  };

  public async getAllCategories(object: PaginationDto) {
    const { page, limit } = object;

    try {

      // NOTE - Se puede usar un promiseAll para hacer las dos consultas en paralelo

      const totalCategories = await CategoryModel.collection.countDocuments({
        // available: true
      });

      const categories = await CategoryModel.collection.find({
        // available: true,
      }).skip((page - 1) * limit).limit(limit).toArray();

      const categoriesFiltered = categories.map((category) => {
        return {
          id: category._id,
          name: category.name,
          available: category.available,
        };
      });

      return {
        page,
        limit,
        total: totalCategories,
        next: totalCategories > (page * limit) ? page + 1 : null,
        previous: page > 1 ? page - 1 : null,
        categories: categoriesFiltered,
      };

    } catch (error) {
      throw CustomError.internalServer('Error getting all categories');
    }
  }
}
