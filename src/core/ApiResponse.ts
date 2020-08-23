import { Response } from "express";

// Helper code for the API consumer to understand the error and handle is accordingly
enum StatusCode {
  SUCCESS = "10000",
  FAILURE = "10001",
  RETRY = "10002",
  INVALID_ACCESS_TOKEN = "10003",
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

class ApiResponse {
  constructor(
    protected statuscode: StatusCode,
    protected status: ResponseStatus,
    protected message: String
  ) {}
  public send(res: Response) {
    return res.send(this.status).json({ message: this.message });
  }
}

export class ApiSuccess extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class ApiBadRequest extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export class ApiForbidden extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export class ApiNotFound extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }
}

export class ApiUnhandled extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}
