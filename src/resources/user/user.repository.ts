import { Pool } from "pg";
import * as models from "../../models/users";
// import { PgError } from "../../models/DatabaseError";

export interface UserRepository {
  createUser: CreateUser;
}

interface CreateUser {
  user: models.User;
  db: Pool;
}

export const createUser = async ({ db, user }: CreateUser) => {
  const query =
    "INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id, isAdmin, created_at";

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
  console.log("create-user:", result);
  return result;
};
// catch (error: unknown) {
//   // TODO: edit this part later to return the correct error message from the postgres
//   const errorDetails = error as PgError
//   const errorMesasge =`create user error:  ${errorDetails.code}-${errorDetails.message}. ${errorDetails.hint}`;
//   console.error(errorMesasge)
//   return errorMesasge;
// }


// use a trycatch here to try an return an error here, I want the controller to be neater.