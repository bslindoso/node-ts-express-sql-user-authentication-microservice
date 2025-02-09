import { Router } from "express";
import usersController from "../controllers/users.controller";

export const router = Router()

router.get('/users', usersController.listAllUsers)
router.get('/users/:uuid', usersController.getUserByUuid)