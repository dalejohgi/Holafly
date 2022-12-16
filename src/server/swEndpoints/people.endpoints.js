const {
  peopleServices,
  generalServices,
  planetServices,
} = require('../../services');

const applyPeopleEndpoints = (server, app) => {
  server.get('/hfswapi/people/weightOnRandomPlanet', async (req, res) => {
    const randomPerson = await peopleServices.getRandomPerson(app);
    const randomPlanet = await planetServices.getRandomPlanet(app);

    const isTheHomePlanet = await planetServices.validateHomePlanet(
      randomPerson.homeworld,
      randomPlanet.name,
    );

    if (isTheHomePlanet) {
      return res.status(409).send({
        status: 'ERROR',
        message: `Trying to calculate the weight for ${randomPerson.name} on ${randomPlanet.name} but it seems this is it's homeworld.`,
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
      });
    }

    const gravity = randomPlanet.gravity.split(' ');
    if (isNaN(gravity[0])) {
      return res.status(409).send({
        status: 'ERROR',
        message: `The random planet has an unkown gravity.`,
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
      });
    }
    const weight = planetServices.getWeightOnPlanet(
      randomPerson.mass,
      +gravity[0],
    );
    return res.status(200).send({
      status: 'OK',
      message: `The weight for ${randomPerson.name} on ${
        randomPlanet.name
      } is ${weight.toFixed(2)}.`,
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
