import { Router } from "express";
import books from "./sources/books";
import magazines from "./sources/magazines";
import websites from "./sources/websites";

const router = Router();

router.use("/books", books);
router.use("/magazines", magazines);
router.use("/websites", websites);

export default router;
