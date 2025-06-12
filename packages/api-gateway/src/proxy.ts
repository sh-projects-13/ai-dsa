import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';
import { services } from './config';

export function setupProxies(app: Express) {
  Object.entries(services).forEach(([name, url]) => {
    app.use(
      `/${name}`,
      createProxyMiddleware({
        target: url,
        changeOrigin: true,
        pathRewrite: {
          [`^/${name}`]: '',
        },
      })
    );
  });
}