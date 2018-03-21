const test = require('tape');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const createApp = require('../../../app');
const { getConfig } = require('../../../../config');

const config = getConfig(process.env.NODE_ENV);

test('POST /api/cb/feedback', tape => {
  const app = createApp(config);
  const dbConnection = app.get('client:psql');

  tape.test('POST /api/cb/feedback | successful payload', t => {
    const secret = app.get('cfg').session.standard_jwt_secret;
    const token = jwt.sign({ email: 'findmyfroggy@frogfinders.com' }, secret);
    const successPayload = {
      query: { feedbackScore: -1 },
    };

    request(app)
      .post('/api/cb/feedback')
      .set('authorization', token)
      .send(successPayload)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        t.notOk(err, err || 'Passes supertest expect criteria');
        t.ok(res.body.result, 'post to feedback returns a result');
        t.end();
      });
  });

  tape.test('POST /api/cb/feedback | empty payload', t => {
    const secret = app.get('cfg').session.standard_jwt_secret;
    const token = jwt.sign({ email: 'findmyfroggy@frogfinders.com' }, secret);
    const emptyPayload = {};

    request(app)
      .post('/api/cb/feedback')
      .set('authorization', token)
      .send(emptyPayload)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        t.deepEqual(
          res.body,
          {
            error: { message: 'Failed to add feedback to database' },
          },
          'Empty payload returns error response object'
        );
        t.notOk(err, err || 'Passes supertest expect criteria');
        t.end();
      });
  });
  tape.test('POST /api/cb/feedback | teardown', t => dbConnection.end(t.end));
});