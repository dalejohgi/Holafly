const loggingMiddleware = app => (req, res, next) => {
  const {
    repositories: { logsRepository },
    db,
  } = app;

  const ip = (
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    ''
  )
    .split(',')[0]
    .trim();
  const headers = JSON.stringify(req.headers);
  const originalUrl = req.originalUrl;

  const log = {
    action: originalUrl,
    header: headers,
    ip,
  };

  logsRepository.registerLog(log, db);

  next();
};

module.exports = loggingMiddleware;
