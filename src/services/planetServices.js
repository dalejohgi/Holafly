const generalServices = require('./generalServices');
const { SWAPI_URL } = process.env;

const retrievePlanetFromSWAPI = async id => {
  return await generalServices.handleGenericRequest({
    url: `${SWAPI_URL}/planet/${id}`,
    method: 'GET',
  });
};

module.exports = {
  retrievePlanetFromSWAPI,
};
