import Book, { BookModel } from "../models/Book";
import { Schema } from "mongoose";
import { LocationModel } from "../models/Location";

// create new book entry
async function createBook(book: Book) {
  try {
    const now = new Date();
    book.createdAt = now;
    book.updatedAt = now;
    const bookModel = await BookModel.create(book);
    const savedBook = await bookModel.save();
    return { savedBook };
  } catch (error) {
    return error;
  }
}

// get all books
async function findAllBooksWith(options: {}) {
  try {
    const books = await BookModel.find(options).lean();
    return books;
  } catch (error) {
    return error;
  }
}
// get one book
async function findBookById(id: Schema.Types.ObjectId) {
  try {
    const book = await BookModel.findById(id).lean();
    if (!book) throw "Book was not found";
    return book;
  } catch (error) {
    return error;
  }
}

// change location of book
async function changeBookLocation(
  bookId: Schema.Types.ObjectId,
  locationId: Schema.Types.ObjectId
) {
  const now = new Date();
  try {
    const location = await LocationModel.findById(locationId);
    if (!location) {
      throw "Location not found";
    }
    const book = await BookModel.findOneAndUpdate(
      { id: bookId },
      { location: location, updatedAt: now },
      { new: true }
    );
    if (!book) {
      throw "Book not Found";
    }
    return book;
  } catch (error) {
    return { message: error };
  }
}

const books = {};

export default books;
