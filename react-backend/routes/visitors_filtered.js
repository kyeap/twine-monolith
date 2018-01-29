const express = require('express');
const getVisitsFilteredBy = require('../database/queries/getVisitsFilteredBy');

const router = express.Router();

router.post('/', (req, res, next) => {
  getVisitsFilteredBy(req.auth.cb_id, {
    filterBy: req.body.filterBy,
    orderBy: req.body.orderBy,
  })
    .then(users => res.send({ users, token: req.auth.adminToken }))
    .catch(next);
});

module.exports = router;
