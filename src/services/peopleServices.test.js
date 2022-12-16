const { getWeightOnPlanet } = require('./peopleServices');

describe('Get weight on random planet test', () => {
  it('Should return the weight of a person according to the gravity of the planet', () => {
    const weight = getWeightOnPlanet(100, 12);
    expect(weight).toBe(1200);
  });
});
