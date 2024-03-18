import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import UserRepository from '../repositories/UserRepository';
import { logger } from '../utils/logger';

const getUsers = async (req: Request, res: Response) => {
  const userRepository = getConnection().getCustomRepository(UserRepository);
  const userData = await userRepository.list();

  logger.log(
    'debug',
    `Requesting ${req.method} ${req.originalUrl}`,
    {
      tags: 'http',
      additionalInfo: {
        body: req.body,
        headers: req.headers,
        response: userData,
      },
    });

  res.send(userData);
};

export default getUsers;
