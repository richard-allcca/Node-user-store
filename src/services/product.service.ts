import { ProductModel } from "../data/mongo/models/product.model";
import { CreateProductDto } from "../domain/dtos/product/create-product.dto";
import { PaginationDto } from "../domain/dtos/shared/pagination.dto";
import { CustomError } from "../domain/errors/custom.error";


export class ProductService {

  public getById = async () => {
    return 'getById';
  }

  public update = async () => {
    return 'update';
  }

  public delete = async () => {
    return 'delete';
  }

  public create = async (productDto: CreateProductDto) => {
    const productExist = await ProductModel.findOne({ name: productDto.name })

    if (productExist) {
      throw CustomError.badRequest('Product already exists');
    }

    try {

      const newProduct = await new ProductModel(productDto);

      await newProduct.save();

      return newProduct;


    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public getAll = async (paginationDto: PaginationDto) => {

    const { page, limit } = paginationDto;

    try {

      // NOTE - Se puede usar un promiseAll para hacer las dos consultas en paralelo

      const totalProducts = await ProductModel.collection.countDocuments({});

      const products = await ProductModel.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('user')
        .populate('category')
        .exec()

      return {
        total: totalProducts,
        page,
        limit,
        next: totalProducts > (page * limit) ? page + 1 : null,
        previous: page > 1 ? page - 1 : null,
        products,
      };

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }
}