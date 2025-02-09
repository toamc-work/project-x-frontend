import { Logger } from './logger.factory';
import { HttpStatusCode } from '@common';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  InternalServerException,
  NotFoundException,
  IsNotVerifiedException,
  TooManyRequestsException,
  UnauthorizedException,
  UnhandledException,
} from '@common/exceptions';

export class HttpException extends Error {
  private readonly logger = new Logger(HttpException.name);
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    this.logger.error(this.message, this.stack);
    switch (this.status) {
      case HttpStatusCode.BAD_REQUEST:
        throw new BadRequestException(this.message);
      case HttpStatusCode.UNAUTHORIZED:
        throw new UnauthorizedException(this.message);
      case HttpStatusCode.FORBIDDEN:
        throw new ForbiddenException(this.message);
      case HttpStatusCode.NOT_FOUND:
        throw new NotFoundException(this.message);
      case HttpStatusCode.CONFLICT:
        throw new ConflictException(this.message);
      case HttpStatusCode.GONE:
        throw new GoneException(this.message);
      case HttpStatusCode.IS_NOT_VERIFIED:
        throw new IsNotVerifiedException(this.message);
      case HttpStatusCode.TOO_MANY_REQUESTS:
        throw new TooManyRequestsException(this.message);
      case HttpStatusCode.INTERNAL_SERVER:
        throw new InternalServerException(this.message);
      default:
        throw new UnhandledException(this.message);
    }
  }
}
