import { createConnection } from 'typeorm';

export const getConnection = async () => {
  return createConnection();
};
