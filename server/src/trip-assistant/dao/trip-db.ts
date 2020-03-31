import { trip_assistant_logger } from '../logger/trip-assistant-logger';

import Knex from 'knex';
import config from 'config';

export const trip_db = Knex({
  debug: true,
  client: 'mysql',
  connection: config.get('trip.db'),
  pool: { min: 0, max: 10 },
  acquireConnectionTimeout: 10000,

  log: {
    debug: (msg: any) => trip_assistant_logger.debug(msg),
    warn: (msg: any) => trip_assistant_logger.warn(msg),
    error: (msg: any) => trip_assistant_logger.error(msg)
  }
});
