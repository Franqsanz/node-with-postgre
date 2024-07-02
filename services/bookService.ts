import { BookModel } from '../models/bookModel';
import { IBook, IRows } from '../types/IBook';

const {
  findAllBooks,
  findById,
  findBySlug,
  findSearch,
  findByGroupFields,
  findUpdateBook,
  createBook,
  deleteBook
} = BookModel;

export const BookService = {
  async findAllBooks(limit: number | null, offset: number): Promise<IRows> {
    try {
      return await findAllBooks(limit, offset);
    } catch (err) {
      throw err;
    }
  },

  async findById(id: string): Promise<IBook[] | null> {
    try {
      return await findById(id);
    } catch (error) {
      throw error;
    }
  },

  async findBySlug(slug: string): Promise<IBook[] | null> {
    try {
      return await findBySlug(slug);
    } catch (error) {
      throw error;
    }
  },

  async findSearch(title: string | string[] | undefined): Promise<IBook[]> {
    try {
      return await findSearch(title);
    } catch (error) {
      throw error;
    }
  },

  async findByGroupFields(): Promise<IBook[]> {
    try {
      return await findByGroupFields();
    } catch (error) {
      throw error;
    }
  },

  async findUpdateBook(values: any[]): Promise<IBook[]> {
    try {
      // const values = Object.values(params);

      return await findUpdateBook(values);
    } catch (error) {
      throw error;
    }
  },

  async createBook(values: any[]): Promise<IBook[]> {
    try {
      // const values = Object.values(params);

      return await createBook(values);
    } catch (error) {
      throw error;
    }
  },

  async deleteBook(id: string): Promise<IBook[] | null> {
    try {
      return await deleteBook(id);
    } catch (error) {
      throw error;
    }
  },
};
