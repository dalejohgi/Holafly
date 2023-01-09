const getAll = async app => {
  const {
    repositories: { logsRepository },
    db
  } = app;
  const foundLogs = await logsRepository.getAll(db);

  const mappedResponse = [];
  for (const log of foundLogs) {
    mappedResponse.push({
      action: log.action,
      header: log.header,
      ip: log.ip,
    });
  }

  return mappedResponse;
};

module.exports = {
  getAll,
};
