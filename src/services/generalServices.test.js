const { handleGenericRequest } = require('./generalServices');
const fetch = jest.mock('node-fetch');

describe('handleGenericRequest tests', () => {
  fetch.mockResolvedValueOnce('');
  it('Should call thw endpoint with body', () => {
    const response = handleGenericRequest({ body: { fakeKey: 'fakeValue' } });
    expect(fetch.toHaveBeenCalledWith('', { body: { fakeKey: 'fakeValue' } }));
  });
});
