const { peopleServices, planetServices } = require('../../services');

const applyPeopleEndpoints = (server, app) => {
  server.get('/hfswapi/people/weightOnRandomPlanet', async (req, res) => {
    const randomPerson = await peopleServices.getRandomPerson(app);
    const randomPlanet = await planetServices.getRandomPlanet(app);

    const response = {
      status: 'OK',
      message: '',
      person: {
        name: randomPerson.name,
        mass: randomPerson.mass,
        homeworld: randomPerson.homeworld,
      },
      planet: {
        name: randomPlanet.name,
        gravity: randomPlanet.gravity,
        url: randomPlanet.url,
      },
    };

    const isTheHomePlanet = await planetServices.validateHomePlanet(
      randomPerson.homeworld,
      randomPlanet.name,
    );

    if (isTheHomePlanet) {
      return res.status(409).send({
        ...response,
        status: 'ERROR',
        message: `Can't calculate the weight for ${randomPerson.name} on ${randomPlanet.name} since this is it's homeworld.`,
      });
    }

    const gravity = randomPlanet.gravity.split(' ');

    if (isNaN(gravity[0])) {
      return res.status(200).send({
        ...response,
        message: `The weight of ${randomPerson.name} on ${randomPlanet.name} is unkown until we get more info about the gravity on this plannet.`,
      });
    }

    if (isNaN(randomPerson.mass)) {
      return res.status(200).send({
        ...response,
        message: `The weight of ${randomPerson.name} on ${randomPlanet.name} is unkown until we get more info about this person's mass on its homeworld.`,
      });
    }

    const weight = planetServices.getWeightOnPlanet(
      randomPerson.mass,
      +gravity[0],
    );
    return res.status(200).send({
      ...response,
      message: `The weight for ${randomPerson.name} on ${
        randomPlanet.name
      } is ${weight.toFixed(2)} kg.`,
      WeightOnPlanet: weight.toFixed(2),
    });
  });

  server.get('/hfswapi/people/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const personFound = await peopleServices.findPersonById(id, app);

      if (!personFound) {
        res.status(404).send('Person does not exist');
      }
      return res.send(personFound);
    } catch (error) {
      res.status(501).send('An error ocurred:');
    }
  });
};

module.exports = applyPeopleEndpoints;
