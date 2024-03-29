import { Request, Response, NextFunction } from "express";
import {  ValidationError,  body, validationResult } from "express-validator";

export const validateUserSignup = [
  body('firstname')
    .matches(/^[a-zA-Z]+$/i)
    .withMessage("firstname must contain only alphabets")
    .isLength({
      min: 2,
    })
    .withMessage("field cannot be empty")
    .isLength({
      max: 50,
    })
    .withMessage("firstname cannot have more than 50 characters")
    .matches(/^\S{3,}$/)
    .withMessage("firstname cannot contain whitespaces")
    .trim(),

  body("lastname")
    .matches(/^[a-zA-Z]+$/i)
    .withMessage("lastname must contain only alphabets")
    .isLength({
      min: 2,
    })
    .withMessage("field cannot be empty")
    .isLength({
      max: 50,
    })
    .withMessage("lastname cannot have more than 50 characters")
    .matches(/^\S{3,}$/)
    .withMessage("lastname cannot contain whitespaces")
    .trim(),

  body("email").isEmail().withMessage("Please input a valid email address"),

  body("password")
    .isLength({
      min: 4,
    })
    .withMessage("password must have atleast 4 characters")
    .isLength({
      max: 50,
    })
    .withMessage("maximum number of characters reached")
    .trim(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        Error: errors.array().map((e: ValidationError) => e.msg as string),
      });
    }
    next();
  },
];

export const validateUserLogin = [
  body("email").isEmail().withMessage("Please input a valid email address"),

  body("password")
    .isLength({
      min: 4,
    })
    .withMessage("password must have atleast 4 characters")
    .isLength({
      max: 50,
    })
    .withMessage("maximum number of characters reached")
    .trim(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        Error: errors.array().map((e: ValidationError) => e.msg as string),
      });
    }
    next();
  },
];
