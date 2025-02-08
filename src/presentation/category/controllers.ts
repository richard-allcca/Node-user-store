import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CategoryService } from "../../services/category.service";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";

export class CategoryController {

  constructor(
    public readonly categoryService: CategoryService,
  ){}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });

  }

  createCategory = (req: Request, res: Response) => {
    const [error, categoryDto] = CreateCategoryDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    this.categoryService.createCategory(categoryDto!, req.body.user)
      .then(category => res.status(201).json(category))
      .catch(error => this.handleError(res, error));

    // Método opcional para manejar errores con try-catch y async-await
    // try {
    //   const category = await this.categoryService.createCategory(categoryDto!, req.body.user);
    //   res.status(201).json(category);
    // } catch (error) {
    //   this.handleError(res, error);
    // }
  };

  getAllCategories = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    // Usamos '+' para convertir el string a número
    const [error, pagination] = PaginationDto.create({ page: +page, limit: +limit });

    if (error) return res.status(400).json({ message: error });

    this.categoryService.getAllCategories(pagination!)
      .then(categories => res.status(200).json(categories))
      .catch(error => this.handleError(res, error));

    // Método opcional para manejar errores con try-catch y async-await
    // try {
    //   const categories = await this.categoryService.getAllCategories();
    //   res.status(200).json(categories);
    // } catch (error) {
    //   this.handleError(res, error);
    // }
  };
}
