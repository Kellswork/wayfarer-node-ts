
import { Pool, QueryResult } from "pg";
import * as models from "../../models/users";

export default class UserRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async createUser(user: models.User): Promise<QueryResult> {
    const query =
      "INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id, is_admin, created_at";

    const result = await this.db.query(query, [
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
  }

  async emailExists(email: string): Promise<boolean> {
    const query = "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)";
    const result = await this.db.query(query, [email]);
    return result.rows[0].exists === true;
  }

  async getUserByID(ID: string): Promise<QueryResult> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await this.db.query(query, [ID]);
    return result;
  }

  async getByEmail(email: string): Promise<QueryResult> {
    const query =
      "SELECT id, password, is_admin, created_at FROM users WHERE email = $1";
    const result = await this.db.query(query, [email]);
    return result;
  }
}
