import { IRows, IBook } from "./IBook";

export interface IRead {
  findAllBooks(limit: number | null, offset: number): Promise<IRows>;
  findById(id: string): Promise<IBook[] | null>;
  findBySlug(id: string): Promise<IBook[] | null>;
  findSearch(title: string | string[] | undefined): Promise<IBook[]>;
  findByGroupFields(): Promise<IBook[]>;
}

export interface IWrite {
  createBook(values: IBook[]): Promise<IBook[]>
  updateBook(values: IBook[]): Promise<IBook[]>;
  deleteBook(id: string): Promise<IBook[] | null>
}

export type IRepository = IRead & IWrite;
