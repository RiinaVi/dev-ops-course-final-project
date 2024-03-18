import { Request, Response } from 'express';

import { getImageLink } from '../utils';
import { logger } from '../utils/logger';

const getImagePath = (req: Request, res: Response) => {
  const { id } = req.params;
  const filePath = getImageLink(id);

  logger.log(
    'debug',
    `Requesting ${req.method} ${req.originalUrl}`,
    {
      tags: 'http',
      additionalInfo: {
        body: req.body,
        headers: req.headers,
        response: filePath,
      },
    });


  res.send({ filePath });
};

export default getImagePath;
