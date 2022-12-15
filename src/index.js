const createServer = require('./server');
const db = require('./data');
const services = require('./services');

const app = {
  db,
  services,
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
