import { Router } from "express";
import checkMongooseId from "../../../lib/checkMongooseId";
import books from "../../../db/actions/books";
import {
  ApiSuccess,
  ApiNoContent,
  ApiNotFound,
  ApiBadRequest,
  ApiUnhandled,
} from "../../../core/ApiResponse";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allBooks = await books.findAllBooksWith(req.query);
    if (allBooks?.length === 0) new ApiNoContent("no content").send(res, []);
    new ApiSuccess("success").send(res, allBooks);
  } catch (error) {
    new ApiNotFound("error").send(res, error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newBook = req.body;
    const createdBook = await books.createBook(newBook);
    if (!createdBook) throw "Book was not created";
    new ApiSuccess("created").send(res, createdBook);
  } catch (error) {
    new ApiBadRequest("Something went wrong").send(res, error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!checkMongooseId(id)) throw "No valid ID";
    const book = await books.findBookById(id);
    new ApiSuccess("created").send(res, book);
  } catch (error) {
    new ApiNotFound("error").send(res, error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    if (!checkMongooseId(id)) {
      new ApiNotFound("error").send(res, "Wrong book-id");
      return;
    }

    const updatedBook = await books.updateBook(id, updates);
    if (!updatedBook) throw "Book was not Updated";

    new ApiSuccess("updated").send(res, updatedBook);
  } catch (error) {
    new ApiUnhandled("error").send(res, error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!checkMongooseId(id)) {
      throw "Id was not valid.";
    }

    const deleted = await books.deleteBook(id);
    if (!deleted) throw "Item not found";

    new ApiSuccess("updated").send(res, deleted);
  } catch (error) {
    new ApiNotFound("error").send(res, "Wrong book-id");
  }
});

export default router;
