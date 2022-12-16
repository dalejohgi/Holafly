const createServer = require('./server');
const { db } = require('./data');
const repositories = require('./repositories');

const app = {
  db,
  repositories,
};

async function start() {
  const server = await createServer(app);

  // Start the GraphQL server
  const port = process.env.PORT || 4567;
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port: ${port}`);
  });
}

start();
