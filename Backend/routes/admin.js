import express from "express";
import { body } from "express-validator";
import { signIn, signUp } from "../controller/admin.js";

const router = express.Router();

router.post(
  "/signup",
  body("name").notEmpty(),
  body("email", "please enter email").notEmpty(),
  body("password", "please enter password").notEmpty(),
  body("password","password must have minimum 8 later and maximum 16 later").isLength({
    min: 8,
    max: 16,
  }),
  signUp
);

router.post(
  "/signin",
  body("email", "please enter email").notEmpty(),
  body("password", "please enter password").notEmpty(),
  body(
    "password",
    "password must have minimum 8 later and maximum 16 later"
  ).isLength({
    min: 8,
    max: 16,
  }),
  signIn
);

export default router;
