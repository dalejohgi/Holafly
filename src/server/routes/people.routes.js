const applyPeopleEndpoints = (server, app) => {
  server.get('/hfswapi/getPeople/:id', async (req, res) => {
    res.sendStatus(501);
  });

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
    res.sendStatus(501);
  });
};

module.exports = applyPeopleEndpoints;
