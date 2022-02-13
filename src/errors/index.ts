export abstract class TestError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, TestError.prototype);
  }

  apiResponseStatus: number = 500;
  apiResponseMessage: string = 'Internal Server Error';

  toApiResponse() {
    return {
      status: this.apiResponseStatus,
      body: {
        message: this.apiResponseMessage,
      },
    };
  }
}

export class UserNotFoundError extends TestError {
  apiResponseStatus: number = 404;
  apiResponseMessage: string = 'User not found';

  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class UsernameAlreadyExistsError extends TestError {
  apiResponseStatus: number = 400;
  apiResponseMessage: string = 'Username already exists';

  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, UsernameAlreadyExistsError.prototype);
  }
}

export class WrongPasswordError extends TestError {
  apiResponseStatus: number = 401;
  apiResponseMessage: string = 'Wrong password';

  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, WrongPasswordError.prototype);
  }
}

export class InvalidJwtError extends TestError {
  apiResponseStatus: number = 401;
  apiResponseMessage: string = 'Session expired';

  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, InvalidJwtError.prototype);
  }
}

export class UnauthorizedError extends TestError {
  apiResponseStatus: number = 401;
  apiResponseMessage: string = 'Unauthorized';

  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ValidationError extends TestError {
  apiResponseStatus: number = 400;
  apiResponseMessage: string = 'Wrong parameters';

  constructor(msg?: string) {
    super(msg);
    if (msg) this.apiResponseMessage = msg;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class InsufficientBalanceError extends TestError {
  apiResponseStatus: number = 400;
  apiResponseMessage: string = 'Insufficient Balance';

  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, InsufficientBalanceError.prototype);
  }
}
