const express = require('express');
const applyRoutes = require('./routes');
const applyMiddlewares = require('./middlewares');

const createExpressServer = async app => {
	const server = express();
	applyMiddlewares(server, app);
	applyRoutes(server, app);
    
    await app.db.initDB();

	server.get('/', async (req, res) => {
		if(process.env.NODE_ENV === 'develop'){
				res.send('Test Enviroment');
		} else {
		    res.sendStatus(200);
		}
    });

	return server;
};

module.exports = createExpressServer;