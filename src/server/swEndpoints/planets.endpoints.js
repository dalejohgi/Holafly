const planetServices = require('../../services/planetServices');

const applyPlanetsEndpoints = (server, app) => {
  server.get('/hfswapi/planets/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const planetFound = await planetServices.findPlanetById(id, app);

      if (!planetFound) {
        res.status(404).send('Planet does not exist');
      }
      return res.send(planetFound);
    } catch (error) {
      res.status(500).send({
        status: 'ERROR',
        message: error,
      });
    }
  });
};

module.exports = applyPlanetsEndpoints;
