/*
 * Community Business Admin Model
 */
import { pick, evolve } from 'ramda';
import { CbAdminCollection, RoleEnum } from './types';
import { Users, ModelToColumn } from './user';
import { Random } from 'twine-util';
import { applyQueryModifiers } from './applyQueryModifiers';
import Roles from './role';


/*
 * Implementation of the UserCollection type for CbAdmin
 */
export const CbAdmins: CbAdminCollection = {
  create (a) {
    return Users.create(a);
  },

  toColumnNames (o) {
    return Users.toColumnNames(o);
  },

  async get (client, q = {}) {
    const query = evolve({
      where: CbAdmins.toColumnNames,
      whereNot: CbAdmins.toColumnNames,
    }, q);

    return applyQueryModifiers(
      client
        .select(query.fields ? pick(query.fields, ModelToColumn) : ModelToColumn)
        .from('user_account')
        .leftOuterJoin('gender', 'user_account.gender_id', 'gender.gender_id')
        .leftOuterJoin('ethnicity', 'user_account.ethnicity_id', 'ethnicity.ethnicity_id')
        .leftOuterJoin('disability', 'user_account.disability_id', 'disability.disability_id')
        .leftOuterJoin(
          'user_account_access_role',
          'user_account.user_account_id',
          'user_account_access_role.user_account_id')
        .where({
          ['user_account_access_role.access_role_id']: client('access_role')
            .select('access_role_id')
            .where({ access_role_name: RoleEnum.CB_ADMIN }),
        }),
      query
    );
  },

  async getOne (client, query = {}) {
    const res = await CbAdmins.get(client, { ...query, limit: 1 });
    return res[0] || null;
  },

  async exists (client, query = {}) {
    const res = await CbAdmins.getOne(client, query);
    return res !== null;
  },

  async add (client, user) {
    return Users.add(client, user);
  },

  async addWithRole (client, cb, user) {
    return client.transaction(async (trx) => {
      const newUser = await Users.add(trx, user);
      await Roles.add(trx, { role: RoleEnum.CB_ADMIN, userId: newUser.id, organisationId: cb.id });
      return newUser;
    });
  },

  async addTemporaryWithRole (client, cb) {
    const [latestTempCbAdmin] = await client('user_account')
      .select('email')
      .where('email', 'like', 'welcome-%@twine-together.com')
      .orderBy('created_at', 'desc')
      .limit(1);

    const count = latestTempCbAdmin ? Number(latestTempCbAdmin.email.match(/\d+/)) : 0;
    const email = `welcome-${count + 1}@twine-together.com`;
    const name = 'TEMPORARY ADMIN USER';
    const password = Random.password();
    const newUser = await client.transaction(async (trx) => {
      const newUser = await Users.add(trx, { name, email, isTemp: true, password });
      await Roles.add(trx, { role: RoleEnum.CB_ADMIN, userId: newUser.id, organisationId: cb.id });
      return newUser;
    });

    return { ...newUser, password };
  },

  async update (client, user, changes) {
    return Users.update(client, user, changes);
  },

  async destroy (client, user) {
    return Users.destroy(client, user);
  },

  async fromOrganisation (client, organisation) {
    return client
      .select(ModelToColumn)
      .from('user_account')
      .leftOuterJoin('gender', 'user_account.gender_id', 'gender.gender_id')
      .leftOuterJoin('ethnicity', 'user_account.ethnicity_id', 'ethnicity.ethnicity_id')
      .leftOuterJoin('disability', 'user_account.disability_id', 'disability.disability_id')
      .leftOuterJoin(
        'user_account_access_role',
        'user_account.user_account_id',
        'user_account_access_role.user_account_id')
      .where({
        'user_account.deleted_at': null,
        ['user_account_access_role.access_role_id']: client('access_role')
          .select('access_role_id')
          .where({ access_role_name: RoleEnum.CB_ADMIN }),
        ['user_account_access_role.organisation_id']: organisation.id,
      });
  },
};
