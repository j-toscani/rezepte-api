import Book, { BookModel } from "../models/Book";
import { Types } from "mongoose";
import { LocationModel } from "../models/Location";

// create new book entry
async function createBook(book: Book) {
  const now = new Date();
  book.createdAt = now;
  book.updatedAt = now;
  const bookModel = await BookModel.create(book);
  const savedBook = await bookModel.save();
  return savedBook;
}

// get all books
async function findAllBooksWith(options: {} = {}) {
  const bookDocuments = await BookModel.find(options);
  if (bookDocuments.length < 1) return null;
  const populatedBooks = bookDocuments.map((bookDocument) =>
    bookDocument.execPopulate()
  );
  const books = await Promise.all(populatedBooks);
  return books;
}

// get one book
async function findBookById(id: string) {
  const bookObjectId = Types.ObjectId(id);
  const bookDocument = await BookModel.findById(bookObjectId);
  if (!bookDocument) return null;
  const book = await bookDocument.populate("location").execPopulate();
  return book;
}

// update a book
export async function updateBook(id: string, updates: {}) {
  const recipe = await BookModel.findOneAndUpdate(
    { _id: Types.ObjectId(id) },
    { ...updates }
  ).lean();

  return recipe;
}

const books = {
  createBook,
  findAllBooksWith,
  findBookById,
  updateBook,
};

export default books;
