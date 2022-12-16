const applyPeopleEndpoints = require('./people.endpoints');
const applyPlanetsEndpoints = require('./planets.endpoints');

const applyRoutes = (server, app) => {
  applyPeopleEndpoints(server, app);
  applyPlanetsEndpoints(server, app);

  return server;
};

module.exports = applyRoutes;
