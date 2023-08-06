export const catchError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

export const globalErrorHandle = (err, req, res, next) => {
  const error = err.message;
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error, stack: err.stack });
};

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
