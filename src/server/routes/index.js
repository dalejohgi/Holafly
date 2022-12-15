const applyPeopleEndpoints = require('./people.routes');
const applyPlanetsEndpoints = require('./planets.routes');

const applyRoutes = (server, app) => {
  applyPeopleEndpoints(server, app);
  applyPlanetsEndpoints(server, app);

  return server;
};

module.exports = applyRoutes;
