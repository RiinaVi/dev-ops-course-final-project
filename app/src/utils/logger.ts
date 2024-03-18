import { createLogger, format } from 'winston';
import WinstonCloudWatch from 'winston-aws-cloudwatch';
import * as process from 'process';

const getCurrentFormattedDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let month: string | number = today.getMonth() + 1; // Months start at 0!
  let day: string | number = today.getDate();

  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;

  return  day + '/' + month + '/' + yyyy;
}

export const logger = createLogger({
  level: 'debug',
  format: format.json(),
  transports: [
    new WinstonCloudWatch({
      logGroupName: process.env.LOG_GROUP,
      logStreamName: getCurrentFormattedDate(),
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