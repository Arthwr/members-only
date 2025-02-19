import { NotFoundError } from '../utils/Errors.js';

const notFoundHanlder = (req, res, next) => {
  next(new NotFoundError(req.method, req.originalUrl));
};

export default notFoundHanlder;
