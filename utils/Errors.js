export class AppError extends Error {
  constructor(message, options = {}) {
    let originalCause = options.cause;

    if (originalCause instanceof AppError && originalCause.cause) {
      originalCause = originalCause.cause;
    }

    super(message, { cause: originalCause });

    this.status = options.status;
    this.type = options.type;
    this.meta = options.meta;
    this.expose = options.expose !== undefined ? options.expose : false;
  }
}

export class NotFoundError extends AppError {
  constructor(method, path) {
    super('The requested resource was not found', {
      status: 404,
      type: 'NotFoundError',
      meta: { method, path },
      expose: true,
    });
  }
}
