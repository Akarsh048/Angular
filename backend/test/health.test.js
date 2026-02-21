const request = require('supertest');
const app = require('../src/app');

describe('health endpoint', () => {
  it('returns ok status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
