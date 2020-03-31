import { logger } from '@service-fw';
import config from 'config';

export const trip_assistant_logger = logger(`${config.get('service.name')}`);
