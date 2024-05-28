const { PORT, NODE_ENV = 'development', CLIENT_URL } = process.env;

export { PORT as port, NODE_ENV as env };

export const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200
};
