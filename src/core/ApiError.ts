import { Response } from "express";

import {
  ApiBadRequest,
  ApiForbidden,
  ApiNotFound,
  ApiUnhandled,
} from "./ApiResponse";

enum ErrorType {
  INTERNAL = "InternalError",
  NOT_FOUND = "NotFoundError",
  NO_ENTRY = "NoEntryError",
  NO_DATA = "NoDataError",
  BAD_REQUEST = "BadRequestError",
  FORBIDDEN = "ForbiddenError",
}

export abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = "error") {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new ApiNotFound(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ApiForbidden(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new ApiBadRequest(err.message).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        return new ApiUnhandled(message).send(res);
      }
    }
  }
}

export class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}
export class NoEntryError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}
export class NoDataError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}
