import { Service, logger } from '@service-fw';
import { router } from './trip-assistant';
import config from 'config';

const _svc_conf = config.get<{ name: string; port: number }>('service');
const _logger = logger(_svc_conf.name);

Service({
  name: _svc_conf.name,
  router: router,
  hooks: {
    init: () => {
      _logger.info(config);
    },
    ready: () => {
      _logger.info('ready ...');
    },
    destroy: () => {
      _logger.info('destroy ...');
    }
  }
}, _svc_conf.port);
