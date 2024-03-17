// import packages
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as models from "../../models/users";
import { hashPassword } from "../../helpers/baseHelpers";
import * as userRepo from "./user.repository";
import { Pool } from "pg";
import { PgError } from "../../models/DatabaseError";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } =
      req.body as models.UserRequestBody;

      // validate email submitted by user, check for eamil in datatase
    const hashedPassword = hashPassword(password);
    const user: models.User = {
      id: uuidv4(),
      firstname,
      lastname,
      password: hashedPassword,
      email,
      isAdmin: false,
    };
    // fetched frm the dbMiddleware
    const db = req.app.locals.db as Pool;
    const createdUser = await userRepo.createUser({ db, user });
    
    console.log("uc", createdUser);
    return res.status(200).json({
      message: "user created",
    });
  } catch (error: unknown) {
    const errorDetails = error as PgError;
    const errorMessage = `create user error:  ${errorDetails.code}-${errorDetails.message}. ${errorDetails.hint}`;
    console.error(errorMessage);
    return res.status(500).json({
      status: "error",
      error: "could not create user: " + errorDetails.message
    });
  }
};
