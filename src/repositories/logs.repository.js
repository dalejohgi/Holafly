const registerLog = (log, db) => {
  const { logging } = db;
  return logging.create(log);
};

const getAll = async db => {
  const { logging } = db;
  return await logging.findAll();
};

module.exports = {
  registerLog,
  getAll,
};
