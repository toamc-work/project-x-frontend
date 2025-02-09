import { Logger } from '../../../providers/utils/logger.util';
import { ApiError } from '../errorcodes/api.error';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  InternalServerException,
  NotFoundException,
  IsntVerifiedException,
  TooManyRequestsException,
  UnauthorizedException,
  UnhandledException,
} from '../exceptions/common.exception';

export class HttpException extends Error {
  private readonly logger = new Logger(HttpException.name);
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    this.logger.error(this.message);

    switch (this.status) {
      case ApiError.BAD_REQUEST:
        throw new BadRequestException(this.message);
      case ApiError.UNAUTHORIZED:
        throw new UnauthorizedException(this.message);
      case ApiError.FORBIDDEN:
        throw new ForbiddenException(this.message);
      case ApiError.NOT_FOUND:
        throw new NotFoundException(this.message);
      case ApiError.CONFLICT:
        throw new ConflictException(this.message);
      case ApiError.GONE:
        throw new GoneException(this.message);
      case ApiError.ISNT_VERIFIED:
        throw new IsntVerifiedException(this.message);
      case ApiError.TOO_MANY_REQUESTS:
        throw new TooManyRequestsException(this.message);
      case ApiError.INTERNAL_SERVER:
        throw new InternalServerException(this.message);
      default:
        throw new UnhandledException(this.message);
    }
  }
}
