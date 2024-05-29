import { notFound } from '../utils/errors.js';

export default (req, res, next) => {
  next(notFound('Not found'));
};
