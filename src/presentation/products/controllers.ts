import { Request, Response } from "express";
import { ProductService } from "../../services/product.service";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";


export class ProductController {

  constructor(
    private readonly productService: ProductService,
  ) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });

  };

  public getAllProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create({ page: +page, limit: +limit });

    if (error) return res.status(400).json({ message: error });

    await this.productService.getAll(paginationDto!)
      .then(products => res.status(200).json(products))
      .catch(error => this.handleError(res, error));
  }

  public getByIdProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(`getById - ${id}`);
  }

  public updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(`update - ${id}`);
  }

  public deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(`delete - ${id}`);
  }

  public createProduct = async (req: Request, res: Response) => {
    const {
      name, available, price, description, user, category
    } = req.body;

    const [ error, productDto ] = CreateProductDto.create({
      name, available, price, description, user, category
    });

    if (error) return res.status(400).json({ message: error });

    await this.productService.create(productDto!)
      .then(products => res.status(201).json(products))
      .catch(error => this.handleError(res, error));
  }
}