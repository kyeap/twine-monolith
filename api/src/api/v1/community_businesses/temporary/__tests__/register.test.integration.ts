import * as Hapi from '@hapi/hapi';
import * as Knex from 'knex';
import { init } from '../../../../../../tests/utils/server';
import { getConfig } from '../../../../../../config';
import { Organisation, Organisations, User, Users } from '../../../../../models';
import { getTrx } from '../../../../../../tests/utils/database';
import { Credentials as StandardCredentials } from '../../../../../auth/strategies/standard';
import { injectCfg } from '../../../../../../tests/utils/inject';


describe('POST /community-businesses/register/temporary', () => {
  let server: Hapi.Server;
  let knex: Knex;
  let trx: Knex.Transaction;

  let admin: User;
  let adminCreds: Hapi.AuthCredentials;
  let organisation: Organisation;
  const config = getConfig(process.env.NODE_ENV);

  beforeAll(async () => {
    server = await init(config);
    knex = server.app.knex;

    organisation = await Organisations.getOne(knex, { where: { name: 'Aperture Science' } });
    admin = await Users.getOne(knex, { where: { name: 'Big Boss' } });
    adminCreds = await StandardCredentials.create(knex, admin, organisation);
  });

  beforeEach(async () => {
    trx = await getTrx(knex);
    server.app.knex = trx;
  });

  afterEach(async () => {
    await trx.rollback();
    server.app.knex = knex;
  });

  afterAll(async () => {
    await server.shutdown(true);
  });

  test('SUCCESS - create a temporary marked CB and admin user', async () => {
    const res = await server.inject(injectCfg({
      method: 'POST',
      url: '/v1/community-businesses/register/temporary',
      payload: {
        orgName: 'Shinra Electric Power Company',
      },
      credentials: adminCreds,
    }));

    expect(res.statusCode).toBe(200);
    expect(res.result).toEqual({
      result: {
        communityBusiness: expect.objectContaining({
          name: 'TEMPORARY ACCOUNT: Shinra Electric Power Company',
          sector: 'TEMPORARY DATA',
        }),
        cbAdmin: expect.objectContaining({
          name: 'TEMPORARY ADMIN USER',
        }),
      },
    });
  });

  test('SUCCESS - FLOW TEST - create account & login', async () => {
    const resRegister = await server.inject(injectCfg({
      method: 'POST',
      url: '/v1/community-businesses/register/temporary',
      payload: {
        orgName: 'Shinra Electric Power Company',
      },
      credentials: adminCreds,
    }));

    expect(resRegister.statusCode).toBe(200);
    const { email, password } = (<any> resRegister.result).result.cbAdmin;

    const resLogin = await server.inject({
      method: 'POST',
      url: '/v1/users/login',
      payload: {
        email,
        password,
      },
    });
    expect(resLogin.statusCode).toBe(200);
  });
});
