import { db } from "../db";
import { User } from "../models/user.model";
import { DatabaseError } from "../models/errors/database.error.model";

const salt = process.env.CRYPT_SALT

class UserRepository {

  async findAllUsers(): Promise<User[]> {
    const query = `
        SELECT uuid, username
        FROM application_user
      `;

    const { rows } = await db.query<User>(query);
    return rows || [];
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
      throw new DatabaseError(`Erro na consulta por ID`, error);
    }
  }


  async findByUsername(username: string): Promise<User> {
    username = username.toLowerCase();
    const query = `
        SELECT uuid, username
        FROM application_user
        WHERE username = $1
    `;

    const values = [username];
    const { rows } = await db.query<User>(query, values);
    const [user] = rows

    return user;
  }

  async create(user: User): Promise<string> {
    user.username = user.username.toLowerCase();

    const script = `
      INSERT INTO application_user (
        username,
        password
      )
      VALUES ($1, crypt($2, $3))
      RETURNING uuid
    `;

    const values = [user.username, user.password, salt];
    const { rows } = await db.query<{ uuid: string }>(script, values);

    return rows[0].uuid
  }

  async update(user: User): Promise<void> {
    const script = `
      UPDATE application_user 
      SET username = $1,
          password = crypt($2, $3)
      WHERE uuid = $4          
    `;

    const values = [user.username, user.password, salt, user.uuid];
    await db.query(script, values);
  }

  async remove(uuid: string): Promise<void> {
    const script = `
      DELETE
      FROM application_user
      WHERE uuid = $1
    `;

    const values = [uuid]
    await db.query(script, values)
  }

};

export default new UserRepository();
