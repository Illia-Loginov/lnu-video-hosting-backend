export const notFound = (message) => {
  const error = new Error(message);
  error.status = 404;

  return error;
};