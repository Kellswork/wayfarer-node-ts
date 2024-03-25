import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import * as models from "../../models/users";
import UserRepository from "./user.repository";
import { hashPassword } from "../../helpers/baseHelpers";
import { PgError } from "../../models/DatabaseError";
import { generateToken } from "../../helpers/jwtTokenHelper";
export class UserController {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  userSignup = async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, email, password } =
        req.body as models.UserRequestBody;

      const doesEmailExist = await this.userRepo.emailExists(email);
      if (doesEmailExist) {
        console.log("email exist", doesEmailExist);
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
        is_admin: false,
        created_at: new Date(Date.now()).toISOString(),
      };

      const result = await this.userRepo.createUser(user);
      const createdUser = result.rows[0] as models.CreatedUser;

      const token = generateToken({
        id: createdUser.id,
        isAdmin: createdUser.is_admin,
      });
      if (typeof token !== "string") {
        console.error(token);
        return res.status(500).json({
          status: "error",
          error: "failed to generate token",
        });
      }

      res.setHeader("authorization", "Bearer " + token);

      return res.status(201).json({
        status: "success",
        data: createdUser,
      });
    } catch (error: unknown) {
      const errorDetails = error as PgError;
      console.error("create user error:", errorDetails);
      return res.status(500).json({
        status: "error",
        error: "could not create user: " + errorDetails.message,
      });
    }
  };

  userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body as models.LoginRequestBody;
    try {
      const doesEmailExist = await this.userRepo.emailExists(email);
      if (!doesEmailExist) {
        return res.status(400).json({
          status: "error",
          error: "this email has no account created",
        });
      }

      const result = await this.userRepo.getByEmail(email);
      const loginUser = result.rows[0] as models.LoginUser;
      const loginUserPassword = loginUser.password ?? "";

      if (!bcrypt.compareSync(password, loginUserPassword)) {
        return res
          .status(400)
          .json({ status: "error", error: "Invalid Password" });
      }
      delete loginUser.password;

      const token = generateToken({
        id: loginUser.id,
        isAdmin: loginUser.is_admin,
      });
      if (typeof token !== "string") {
        console.error(token);
        return res.status(500).json({
          status: "error",
          error: "failed to generate token",
        });
      }

      res.setHeader("authorization", "Bearer " + token);

      return res.status(200).json({
        status: "success",
        data: {
          id: loginUser.id,
          is_admin: loginUser.is_admin,
          created_at: loginUser.created_at,
        },
      });
    } catch (error: unknown) {
      const errorDetails = error as PgError;
      console.error("login user error:", errorDetails);
      return res.status(500).json({
        status: "error",
        error: "could not login user: " + errorDetails.message,
      });
    }
  };
}
