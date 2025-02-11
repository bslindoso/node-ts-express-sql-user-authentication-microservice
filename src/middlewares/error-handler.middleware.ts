import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "../models/errors/database.error.model";
import { StatusCode } from "../utils/status.codes";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof DatabaseError) {
    res.status(StatusCode.BAD_REQUEST).send(error.message)
  } else {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error.message)
  }
}

export default errorHandler;