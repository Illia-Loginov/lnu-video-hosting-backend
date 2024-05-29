export const badRequest = (message) => {
  const error = new Error(message);
  error.status = 400;

  return error;
};

export const notFound = (message) => {
  const error = new Error(message);
  error.status = 404;

  return error;
};
