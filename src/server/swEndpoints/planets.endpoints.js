const planetServices = require('../../services/planetServices');

const applyPlanetsEndpoints = (server, app) => {
  server.get('/hfswapi/planets/:id', async (req, res) => {
    const { id } = req.params;

    const planetFound = await planetServices.findPlanetById(id, app);

    if (!planetFound) {
      res.status(404).send('Planet does not exist');
    }
    return res.send(planetFound);
  });
};

module.exports = applyPlanetsEndpoints;
