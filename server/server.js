/* eslint-disable no-console */
import koa from 'koa';

import config from '../config';
import koaConfig from './config/koa';

const app = koa();
koaConfig(app);

const port = config.server.port;

app.listen(port, () => {
  console.log(`Static server listening on port:${port} in ${process.env.NODE_ENV} mode`);
});

/* eslint-enable no-console */
