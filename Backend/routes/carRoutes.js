import express from "express";
import { CarAdd, CarDelete, CarEdit, CarShow, FilterBySearch } from "../controller/carController.js";
import { verifyToken } from "../middleware/verification.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/add",
  body("name").notEmpty(),
  body("brand").notEmpty(),
  body("price").notEmpty(),
  body("stock").notEmpty(),
  verifyToken, CarAdd);

router.get("/show", verifyToken, CarShow);

router.put("/edit",
  body("name").notEmpty(),
  body("brand").notEmpty(),
  body("price").notEmpty(), 
  body("stock").notEmpty(),
  verifyToken, CarEdit);

router.delete("/delete/:_id", verifyToken, CarDelete);
router.get('/search/:searchKey', verifyToken, FilterBySearch);
export default router;