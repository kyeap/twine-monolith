import * as Knex from 'knex';

exports.seed = async (knex: Knex) =>
  knex('visit_activity')
    .insert([
      {
        organisation_id: knex('organisation').select('organisation_id').where({ organisation_name: 'Aperture Science' }),
        visit_activity_name: 'Absailing',
        visit_activity_category_id: knex('visit_activity_category').select('visit_activity_category_id').where({ visit_activity_category_name: 'Sports' }),
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
        sunday: true,
      },
      {
        organisation_id: knex('organisation').select('organisation_id').where({ organisation_name: 'Aperture Science' }),
        visit_activity_name: 'Wear Pink',
        visit_activity_category_id: knex('visit_activity_category').select('visit_activity_category_id').where({ visit_activity_category_name: 'Socialising' }),
        monday: false,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      {
        organisation_id: knex('organisation').select('organisation_id').where({ organisation_name: 'Aperture Science' }),
        visit_activity_name: 'Free Running',
        visit_activity_category_id: knex('visit_activity_category').select('visit_activity_category_id').where({ visit_activity_category_name: 'Sports' }),
        monday: false,
        tuesday: true,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: true,
        sunday: true,
      },
      {
        organisation_id: knex('organisation').select('organisation_id').where({ organisation_name: 'Aperture Science' }),
        visit_activity_name: 'Grow your own Groot',
        visit_activity_category_id: knex('visit_activity_category').select('visit_activity_category_id').where({ visit_activity_category_name: 'Outdoor work and gardening' }),
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },

    ]);
