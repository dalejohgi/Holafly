const fetch = require('node-fetch');

const handleGenericRequest = async ({
  url = '',
  method = '',
  body,
  logging = false,
}) => {
  let options = {
    method,
  };
  if (body) {
    options.body = body;
  }
  const response = await fetch(url, options);
  const data = await response.json();
  if (logging) {
    console.log(data);
  }
  return {...data, code: response.status};
};

const generateRandomDBIndex = itemsLength => {
  return Math.floor(Math.random() * itemsLength);
};

module.exports = {
  handleGenericRequest,
  generateRandomDBIndex,
};
