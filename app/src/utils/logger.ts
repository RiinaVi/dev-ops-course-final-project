import { createLogger, format } from 'winston';
import WinstonCloudWatch from 'winston-aws-cloudwatch';
import * as process from 'process';

export const logger = createLogger({
  level: 'debug',
  format: format.json(),
  transports: [
    new WinstonCloudWatch({
      logGroupName: process.env.LOG_GROUP,
      logStreamName: String(new Date),
      createLogGroup: true,
      createLogStream: true,
      awsConfig: {
        accessKeyId: process.env.S3_API_KEY,
        secretAccessKey: process.env.S3_API_SECRET,
        region: process.env.S3_REGION,
      },
      formatLog: (item: any) =>
        `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
    }),
  ]
});