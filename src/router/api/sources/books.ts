import { Router } from "express";
import checkMongooseId from "../../../lib/checkMongooseId";
import books from "../../../db/actions/books";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allBooks = await books.findAllBooksWith(req.query);
    if (allBooks?.length === 0)
      throw "There are no Books matching these options in your Database";
    res.status(200).send(allBooks);
  } catch (error) {
    res.status(403).send({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBook = req.body;
    const createdBook = await books.createBook(newBook);
    if (!createdBook) throw "Book was not created";
    res.status(200).send(createdBook);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!checkMongooseId(req.params.id)) throw "No valid ID";
    const book = await books.findBookById(req.params.id);
    res.status(200).send(book);
  } catch (error) {
    res.status(403).send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const locationId = req.body.id;
    if (!checkMongooseId(bookId) || !checkMongooseId(locationId))
      throw "No valid ID";
    const updatedBook = await books.changeBookLocation(bookId, locationId);
    if (!updatedBook) throw "Book was not Updated";
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;