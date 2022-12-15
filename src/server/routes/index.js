const applySwapiEndpoints = require('../server/endpoints/swapiEndpoints');

const applyEndpoints = (server, app) => {
	applySwapiEndpoints(server, app);
	return server;
};

module.exports = applyEndpoints;