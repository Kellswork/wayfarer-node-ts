import request from 'supertest';
import {server, RootResponse} from '../app';


afterAll( () => {
  // shuts down the server after the test has run
  server.close()
})

describe('Test the root path', () => {
  it('should return a welcome message for the root path', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    const responseBody = response.body as RootResponse;
    expect(responseBody.message).toEqual("Welcome to wayfarer API");
  });
});