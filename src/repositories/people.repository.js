const findById = async (id, swPeople) => {
  return await swPeople.findOne({ where: { id } });
};

module.exports = {
  findById,
};
