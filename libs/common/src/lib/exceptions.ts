// INTERNATIONAL EXCEPTIONS
export class BadRequestException extends Error {}
export class UnauthorizedException extends Error {}
export class ForbiddenException extends Error {}
export class NotFoundException extends Error {}
export class ConflictException extends Error {}
export class GoneException extends Error {}
export class IsNotVerifiedException extends Error {}
export class TooManyRequestsException extends Error {}
export class InternalServerException extends Error {}
export class UnexpectedException extends Error {}
export class UnhandledException extends Error {}

// CUSTOM EXCEPTIONS
export class InvalidOtpException extends Error {}
export class MethodNotModifiedException extends Error {
  constructor(message = 'method not modified exception') {
    super(message);
    this.name = MethodNotModifiedException.name;
  }
}
