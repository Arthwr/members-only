export class AppError extends Error {
  constructor(message, { status, type, meta }, cause = null) {
    if (cause instanceof AppError) {
      return cause;
    }

    super(message);
    this.status = status;
    this.type = type;
    this.meta = meta;
    this.cause = cause;
  }
}

export class NotFoundError extends AppError {
  constructor(method, path) {
    super('The requested resource was not found', {
      status: 404,
      type: 'NotFoundError',
      meta: { method, path },
    });
  }
}
