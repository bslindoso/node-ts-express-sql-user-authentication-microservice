import { Request, Response } from "express"
import UserRepository from "../repositories/users.repository"
import { StatusCode } from "../utils/status.codes"

class UserController {

  async listAllUsers(req: Request, res: Response) {
    const users = await UserRepository.findAllUsers()
    res.status(StatusCode.OK).send(users)
  }

  async getUserByUuid(req: Request, res: Response) {
    const uuid = req.params.uuid
    const users = await UserRepository.findById(uuid)
    res.status(StatusCode.OK).send(users)

  }
}

export default new UserController();

