import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import router from './routes';
import { logger } from './utils/logger';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

const main = async () => {
  await createConnection();

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/', router);

  app.use((err: Error, req: Request, res: Response) => {
    if (err.stack) {
      console.error(err.stack);
      return res
        .status(500)
        .send({ error: { message: 'something went wrong :(' } });
    }
  });

  app.use((req, res, next) => {
    logger.log('debug', `Requesting ${req.method} ${req.originalUrl}`, {tags: 'http', additionalInfo: {body: req.body, headers: req.headers }});
    next()
  });

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
