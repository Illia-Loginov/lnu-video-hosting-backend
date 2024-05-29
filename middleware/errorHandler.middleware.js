import Joi from 'joi';
import { isMulterValidationError } from './multipart.middleware.js';

export default (error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json(error.message);
  } else if (
    error instanceof Joi.ValidationError ||
    isMulterValidationError(error)
  ) {
    res.status(400).json(error.message);
  } else {
    console.error(error);

    res.sendStatus(500);
  }
};
