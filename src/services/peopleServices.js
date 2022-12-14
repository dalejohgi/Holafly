const generalServices = require('./generalServices');
const { SWAPI_URL } = process.env;
const { AVAILABLE_PEOPLE } = require('../utils/constants');

const findPersonById = async (id, app) => {
  const {
    repositories: { peopleRepository },
    db: { swPeople },
  } = app;

  let response;
  let personFound = await peopleRepository.findById(id, swPeople);
  if (personFound) {
    response = {
      name: personFound.name,
      mass: personFound.mass,
      height: personFound.height,
      homeworld_name: personFound.homeworld_name,
      homeworld_id: personFound.homeworld_id,
    };
    return response;
  } else {
    personFound = await retrievePersonFromSWAPI(id);

    if (personFound) {
      planetFound = await generalServices.handleGenericRequest({
        url: personFound.homeworld,
        method: 'GET',
      });
      response = {
        name: personFound.name,
        mass: +personFound.mass,
        height: +personFound.height,
        homeworld_name: planetFound.name,
        homeworld_id: planetFound.url.match(/[/]planets[/][0-9]+/g)[0],
      };
    }
    return response;
  }
};

const retrievePersonFromSWAPI = async id => {
  return await generalServices.handleGenericRequest({
    url: `${SWAPI_URL}/people/${id}`,
    method: 'GET',
  });
};

const getRandomPerson = async app => {
  const {
    repositories: { peopleRepository },
    db: { swPeople },
  } = app;

  const randomId = generalServices.generateRandomDBIndex(AVAILABLE_PEOPLE);
  let personFound = await peopleRepository.findById(randomId, swPeople);

  if (!personFound) {
    personFound = await retrievePersonFromSWAPI(randomId);
  }

  return personFound;
};

module.exports = {
  findPersonById,
  retrievePersonFromSWAPI,
  getRandomPerson,
};
