const applyPlanetsEndpoints = (server, app) => {
  server.get('/hfswapi/getPlanet/:id', async (req, res) => {
    res.sendStatus(501);
  });
};

module.exports = applyPlanetsEndpoints;
