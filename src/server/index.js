const express = require('express');
const applyRoutes = require('./swEndpoints');
const applyMiddlewares = require('./middlewares');

const createExpressServer = async app => {
  const server = express();
  applyMiddlewares(server, app);
  applyRoutes(server, app);

  await app.db.initDB();
  // Temporal
  await app.db.populateDB();

  server.get('/', async (req, res) => {
    if (process.env.NODE_ENV === 'develop') {
      res.send('Test Enviroment');
    } else {
      res.sendStatus(200);
    }
  });

  server.get('/hfswapi/test', async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      'https://swapi.dev/api/',
      'GET',
      null,
      true,
    );
    res.send(data);
  });

  server.get('/hfswapi/getLogs', async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });

  return server;
};

module.exports = createExpressServer;
