const generalServices = require('./generalServices');
const { AVAILABLE_PLANETS } = require('../utils/constants');
const { SWAPI_URL } = process.env;

const getWeightOnPlanet = (mass, gravity) => {
  return mass * gravity;
};

const retrievePlanetFromSWAPI = async ({ id, url = '' }) => {
  return await generalServices.handleGenericRequest({
    url: url || `${SWAPI_URL}/planets/${id}`,
    method: 'GET',
  });
};

const getRandomPlanet = async app => {
  const {
    repositories: { planetsRepository },
    db: { swPlanet },
  } = app;

  const randomId = generalServices.generateRandomDBIndex(AVAILABLE_PLANETS);
  let planetFound = await planetsRepository.findById(randomId, swPlanet);

  if (!planetFound) {
    planetFound = await retrievePlanetFromSWAPI({ id: randomId });
  }
  return planetFound;
};

// Validates if the randomPerson's homeland is the same random planet
const validateHomePlanet = async (personWorld, planetName) => {
  const planetFound = await retrievePlanetFromSWAPI({ url: personWorld });
  console.log(planetFound.name, planetName);
  return planetFound.name === planetName;
};

module.exports = {
  getWeightOnPlanet,
  retrievePlanetFromSWAPI,
  getRandomPlanet,
  validateHomePlanet,
};
