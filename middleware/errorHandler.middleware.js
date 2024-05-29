export default (error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json(error.message);
  } else {
    res.sendStatus(500);
  }
};
