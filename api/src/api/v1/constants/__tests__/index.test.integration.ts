/*
 * User API functional tests
 */
import * as Hapi from '@hapi/hapi';
import { init } from '../../../../../tests/utils/server';
import { getConfig } from '../../../../../config';

describe('API Constants', () => {
  let server: Hapi.Server;
  const config = getConfig(process.env.NODE_ENV);

  beforeAll(async () => {
    server = await init(config);
  });

  afterAll(async () => {
    await server.shutdown(true);
  });


  [
    'sectors',
    'regions',
    'genders',
    'disabilities',
    'ethnicities',
    'visit-activity-categories',
    'volunteer-activities',
  ]
    .forEach((constant) => {
      test(`GET ${constant}`, async () => {
        const res = await server.inject({
          method: 'GET',
          url: `/v1/${constant}`,
        });

        expect(res.statusCode).toBe(200);
        expect(res.result).toEqual({
          result: expect.arrayContaining([expect.objectContaining({ id: 1 })]),
        });
      });
    });

  test('GET /sectors does not include TEMPORARY DATA value', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/sectors',
    });

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toEqual({
      result: expect.arrayContaining([
        expect.objectContaining({
          name: 'TEMPORARY DATA',
        }),
      ]),
    });
  });

  test('GET /regions does not include TEMPORARY DATA value', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/regions',
    });

    expect(res.statusCode).toBe(200);
    expect(res.result).not.toEqual({
      result: expect.arrayContaining([
        expect.objectContaining({
          name: 'TEMPORARY DATA',
        }),
      ]),
    });
  });
});
