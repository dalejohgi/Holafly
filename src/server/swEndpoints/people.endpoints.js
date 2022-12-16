const { peopleServices, generalServices } = require('../../services');

const applyPeopleEndpoints = (server, app) => {
  server.get('/hfswapi/people/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const personFound = await peopleServices.findPersonById(id, app);

      if (!personFound) {
        res.status(404).send('Person does not exist');
      }
      return res.send(personFound);
    } catch (error) {
      res.status(501).send('An error ocurred:', {error});
    }
  });

  server.get('/hfswapi/people/weightOnRandomPlanet', async (req, res) => {
    res.sendStatus(501);
  });
};

module.exports = applyPeopleEndpoints;

