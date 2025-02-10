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

  async createUser(req: Request, res: Response) {
    const newUser = req.body

    const uuid = await UserRepository.create(newUser)
    res.status(StatusCode.CREATED).send(uuid)
  }

  async updateUser(req: Request, res: Response) {
    const uuid = req.params.uuid
    const updatedUser = req.body
    updatedUser.uuid = uuid

    await UserRepository.update(updatedUser)

    res.status(StatusCode.OK).send()
  }

  async removeUser(req: Request, res: Response) {
    const uuid = req.params.uuid

    await UserRepository.remove(uuid)
    res.status(StatusCode.OK).send()
  }
}

export default new UserController();

