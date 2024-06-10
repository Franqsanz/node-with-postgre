import { BookModel } from '../model/bookModel';

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
  async findAllBooks(limit: number | null, offset: number) {
    try {
      return await findAllBooks(limit, offset);
    } catch (err) {
      throw err;
    }
  },

  async findById(id: string) {
    try {
      return await findById(id);
    } catch (error) {
      throw error;
    }
  },

  async findBySlug(slug: string) {
    try {
      return await findBySlug(slug);
    } catch (error) {
      throw error;
    }
  },

  async findSearch(title: string | string[] | undefined) {
    try {
      return await findSearch(title);
    } catch (error) {
      throw error;
    }
  },

  async findByGroupFields() {
    try {
      return await findByGroupFields();
    } catch (error) {
      throw error;
    }
  },

  async findUpdateBook(values: any[]) {
    try {
      // const values = Object.values(params);

      return await findUpdateBook(values);
    } catch (error) {
      throw error;
    }
  },

  async createBook(values: any[]) {
    try {
      // const values = Object.values(params);

      return await createBook(values);
    } catch (error) {
      throw error;
    }
  },

  async deleteBook(id: string) {
    try {
      return await deleteBook(id);
    } catch (error) {
      throw error;
    }
  },
};
