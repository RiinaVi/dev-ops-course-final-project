import { createLogger, format } from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import * as process from 'process';

export const logger = createLogger({
  level: 'debug',
  format: format.json(),
  transports: [
    new WinstonCloudWatch({
      level: 'error',
      awsAccessKeyId: process.env.S3_API_KEY,
      awsSecretKey: process.env.S3_API_SECRET,
      logGroupName: process.env.LOG_GROUP,
      awsRegion: process.env.S3_REGION
    }),
  ]
});