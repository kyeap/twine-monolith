import * as Hapi from '@hapi/hapi';
import { init } from '../../../../../tests/utils/server';
import { getConfig } from '../../../../../config';


describe('External auth scheme', () => {
  let server: Hapi.Server;
  const config = getConfig(process.env.NODE_ENV);

  beforeAll(async () => {
    server = await init(config);
  });

  afterAll(async () => {
    await server.shutdown(true);
  });

  test('SUCCESS - Token needed for authorised routes', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/v1/community-businesses/me/visitors',
      headers: { authorization: 'bearer aperture-token' },
    });
    expect(response.statusCode).toBe(200);
  });

  test('FAIL - Fake token is unauthorised', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/v1/community-businesses/me/visitors',
      headers: { authorization: 'bearer faketoken' },
    });
    expect(response.statusCode).toBe(401);
  });

  test('FAIL - No token is unauthorised', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/v1/community-businesses/me/visitors',
      headers: { authorization: '' },
    });
    expect(response.statusCode).toBe(401);
  });
});
