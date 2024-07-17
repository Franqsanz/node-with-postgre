import { IRows, IBook } from "./IBook";
import { IUser } from "./IUser";

interface IReadBook {
  findBooks(limit: number | null, offset: number): Promise<IRows>;
  findById(id: string): Promise<IBook[] | null>;
  findBySlug(id: string): Promise<IBook[] | null>;
  findSearch(title: string | string[] | undefined): Promise<IBook[]>;
  findByGroupFields(): Promise<IBook[]>;
}

interface IWrite {
  createBook(values: IBook[]): Promise<IBook[]>
  updateBook(values: IBook[]): Promise<IBook[]>;
  deleteBook(id: string): Promise<IBook[] | null>
}

interface IReadUser {
  findUsers(): Promise<IUser[]>;
  findUsersBooksDetails(): Promise<IUser[]>;
}

export type IRepository = IReadBook & IWrite;
export {
  IReadBook,
  IWrite,
  IReadUser
}
