import { db } from "../db";
import { User } from "../models/user.model";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    try {
      const query = `
                SELECT uuid, username
                FROM application_user
            `;

      const { rows } = await db.query<User>(query);
      return rows || [];
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Database query failed');
    }
  }
}

export default new UserRepository();
