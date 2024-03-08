import { Request, Response } from 'express';

import { getImageLink } from '../utils';

const getImagePath = (req: Request, res: Response) => {
  const { id } = req.params;
  const filePath = getImageLink(id);

  res.send({ filePath });
};

export default getImagePath;
