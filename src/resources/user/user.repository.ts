import { Pool, QueryResult } from "pg";
import * as models from "../../models/users";
// import { PgError } from "../../models/DatabaseError";

export interface UserRepository {
  createUser: (db: Pool, user: models.User) => Promise<QueryResult>;
  emailExist: (db: Pool, email: string) => Promise<boolean>;
  getUserByID: (db: Pool, email: string) => Promise<QueryResult>;
}

interface CreateUser {
  user: models.User;
  db: Pool;
}

export const createUser = async (db: Pool, user: models.User) => {
  const query =
    "INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, to_timestamp($7), $8) returning id, is_admin, created_at";

  const result = await db.query(query, [
    user.id,
    user.firstname,
    user.lastname,
    user.email,
    user.password,
    user.isAdmin,
    user.createdAt,
    user.updatedAt,
  ]);
  return result;
};
// catch (error: unknown) {
//   // TODO: edit this part later to return the correct error message from the postgres
//   const errorDetails = error as PgError
//   const errorMesasge =`create user error:  ${errorDetails.code}-${errorDetails.message}. ${errorDetails.hint}`;
//   console.error(errorMesasge)
//   return errorMesasge;
// }

export const emailExists = async (
  db: Pool,
  email: string
): Promise<boolean> => {
  const query = "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)";

  const result = await db.query(query, [email]);
  // console.log("checking-if-email-exist:", result.rows[0]);
  if (result.rows[0].exists === true) return true;
  return false;
};

export const getUserByID = async (db: Pool, ID: string) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const result = await db.query(query, [ID]);
  return result;
  // what happens if an error occurs?
};
