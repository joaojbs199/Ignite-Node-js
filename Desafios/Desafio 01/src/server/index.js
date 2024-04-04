import  http from 'node:http'
import { json } from '../middlewares/json.js';
import { routeDefinition } from './route-definition.js';
import { extractQueryParams } from '../utils/extract-query-params.js';

const server  = http.createServer(async (req, res) => {
  const { method, url } = req;
  res.setHeader('content-type', 'application/json')

  await json(req, res);

  const route = routeDefinition.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333)