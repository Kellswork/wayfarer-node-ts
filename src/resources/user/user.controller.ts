// import packages
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as models from "../../models/users";
import { hashPassword } from "../../helpers/baseHelpers";
import * as userRepo from "./user.repository";
import { Pool } from "pg";
import { PgError } from "../../models/DatabaseError";
import { generateToken } from "../../helpers/jwtTokenHelper";

export const userSignup = async (req: Request, res: Response) => {
  try {
    // fetched frm the dbMiddleware
    const db = req.app.locals.db as Pool;
    const { firstname, lastname, email, password } =
      req.body as models.UserRequestBody;

    // validate email submitted by user, check for eamil in datatase
    const doesEmailExist = await userRepo.emailExists(db, email);
    console.log("email-exist", doesEmailExist);
    if (doesEmailExist) {
      return res.status(400).json({
        status: "error",
        error: "email has already been registered",
      });
    }

    const hashedPassword = hashPassword(password);
    const user: models.User = {
      id: uuidv4(),
      firstname,
      lastname,
      password: hashedPassword,
      email,
      isAdmin: false,
      createdAt: Date.now(),
    };

    const result = await userRepo.createUser(db, user);
    const createdUser: models.CreatedUser = result.rows[0];

    // genertate jwt token
    const token = generateToken({
      id: createdUser.id,
      isAdmin: createdUser.isAdmin,
    });
    if (typeof token !== "string") {
      console.error(token);
      return res.status(500).json({
        status: "error",
        error: "failed to generate token",
      });
    }

    // set the header to the generated token
    res.setHeader("authorization", "Bearer " + token);

    // return created user as response
    return res.status(201).json({
      status: "sucess",
      data: createdUser,
    });
  } catch (error: unknown) {
    const errorDetails = error as PgError;
    const errorMessage = `create user error:  
    ${errorDetails.code}-${errorDetails.message}. hint: ${errorDetails.hint}
    ${errorDetails.table} table, constraints: ${errorDetails.constraint}
    `;
    console.error(errorMessage);

    return res.status(500).json({
      status: "error",
      error: "could not create user: " + errorDetails.message,
    });
  }
};
