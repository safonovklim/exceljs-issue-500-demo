import koaRouter from 'koa-router';

import routeConfig from '../routes/index';

export default (app) => {
  app.on('error', error => console.error(error));

  const router = koaRouter();
  routeConfig(router);
  app.use(router.routes());
};
