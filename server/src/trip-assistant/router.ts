import Router from 'koa-router';
import flight_apply_router from './api/flight-apply-router';
import vehicle_arrange_router from './api/vehicle-arrange-router';

const router = new Router();
router.use(flight_apply_router.routes(), flight_apply_router.allowedMethods());
router.use(vehicle_arrange_router.routes(), vehicle_arrange_router.allowedMethods());

router.get('/', async (ctx) => {
  ctx.body = 'Welcome to trip-assistant-server!';
});

export { router };
