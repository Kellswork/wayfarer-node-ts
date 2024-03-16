import { QueryResult } from "pg";
import * as models from "../../models/users";

export interface UserRepository {
createUser: CreateUser
}

interface CreateUser {
  user: models.User;
  db: {
    query: (
      text: string,
      params?: [string, string, string, string, string, boolean, string, string]
    ) => Promise<QueryResult>;
  };
}

export const createUser = async ({ user, db }: CreateUser): Promise<QueryResult<models.User> | undefined> => {
  try {
    const query = "INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id, isAdmin, created_at";

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
    console.log('create-user:', result)
    return result;
  } catch (error) {
    // TODO: edit this part later to return the correct error message from the postgres
    console.log("an err occured:", error);
  }
}

// validate email address