const findById = async (id, swPlanet) => {
  return await swPlanet.findOne({ where: { id } });
};

module.exports = {
  findById,
};
