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

  async findById(uuid: string): Promise<User> {
    try {
      const query = `
      SELECT uuid, username
      FROM application_user
      WHERE uuid = $1
    `;
      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows
      return user;

    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Database query failed');
    }
  }
}


export default new UserRepository();
