import 'dotenv/config';

import app from './app.js';
import { port } from './config/server.config.js';

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
