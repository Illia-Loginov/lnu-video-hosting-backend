import Joi from 'joi';

export default (error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json(error.message);
  } else if (error instanceof Joi.ValidationError) {
    res.status(400).json(error.message);
  } else {
    res.sendStatus(500);
  }
};
