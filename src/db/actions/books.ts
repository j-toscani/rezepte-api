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
  const book = await bookDocument.execPopulate();
  return book;
}

// change location of book
async function changeBookLocation(
  bookId: string,
  locationId: string
): Promise<Book | null> {
  const now = new Date();
  const bookObjectId = Types.ObjectId(bookId);
  const locationObjectId = Types.ObjectId(locationId);

  const location = await LocationModel.findById(locationObjectId);
  if (!location) return null;
  const book = await BookModel.findOneAndUpdate(
    { id: bookObjectId },
    { location: location, updatedAt: now },
    { new: true }
  );
  return book;
}

const books = {
  createBook,
  findAllBooksWith,
  findBookById,
  changeBookLocation,
};

export default books;
