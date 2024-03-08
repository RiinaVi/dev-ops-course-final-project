import { File } from 'formidable';
import path from 'path';
import fs from 'fs';

import { IMAGES_DIRECTORY } from './index';

const createImageById = async (id: string, file: File) => {
  const extname = path.extname(file.name);
  const fileName = `${id}${extname}`;

  const rawData = fs.readFileSync(file.path);

  const filePath = path.join(IMAGES_DIRECTORY, fileName);

  fs.writeFileSync(filePath, rawData);

  return fileName;
};

export default createImageById;
