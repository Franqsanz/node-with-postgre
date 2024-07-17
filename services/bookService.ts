import { BookRepository } from '../repositories/bookRepository';
import { IRepository } from '../interfaces/IRepository';

export const BookService: IRepository = {
  async findAllBooks(limit, offset) {
    return await BookRepository.findAllBooks(limit, offset);
  },

  async findById(id) {
    return await BookRepository.findById(id);
  },

  async findBySlug(slug) {
    return await BookRepository.findBySlug(slug);
  },

  async findSearch(title) {
    return await BookRepository.findSearch(title);
  },

  async findByGroupFields() {
    return await BookRepository.findByGroupFields();
  },

  async updateBook(values) {
    return await BookRepository.updateBook(values);
  },

  async createBook(values) {
    return await BookRepository.createBook(values);
  },

  async deleteBook(id) {
    return await BookRepository.deleteBook(id);
  },
};
