

export class PaginationDto {

  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}

  static create = (object: { [key: string]: any }): [string?, PaginationDto?] => {
    const { page, limit } = object;

    if (isNaN(page) || isNaN(limit)) return ['Page and limit must be numbers', undefined];
    if (page < 1 ) return ['Page must be greater than 0', undefined];
    if (limit < 1) return ['Limit must be greater than 0', undefined];

    const newPagination = new PaginationDto(page, limit);

    return [undefined, newPagination];
  }
}