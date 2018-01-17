const dbConnection = require('../dbConnection');

const getAllUsersQuery = `
  SELECT users.id, users.fullName, users.sex, users.yearofbirth, users.email, users.date
  FROM users
  WHERE users.cb_id = $1`;

const getUserList = cbId =>
  new Promise((resolve, reject) => {
    dbConnection
      .query(getAllUsersQuery, [cbId])
      .then(res => {
        if (res.rowCount === 0) {
          return reject('No user found');
        }
        resolve(res.rows);
      })
      .catch(reject);
  });

module.exports = getUserList;
