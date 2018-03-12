BEGIN;

SET time zone 'UTC';

INSERT INTO cbusiness
  (org_name, genre, email, hash_pwd, date)
VALUES
  ('Dog & Fish', 'pub', 'jinglis12@googlemail.com', '06dbc7f5b12c6984b3ae140221bdb54c69a81fa97dab00770a0f5a29d17a022b', '2018-01-11 21:50:10+00'),
  ('alina industries', 'pub', 'a@gmail.com', '9B8813FE04843F4B42735C199192CA745C3639581F72AF340F833556B965012F', '2017-05-15 12:24:56+00'),
  ('Frog Finders', 'Environment or nature', 'findmyfroggy@frogfinders.com', '0a0429fa911712f7aca189bb12995963e3fc8f361e2845f747994be499250762', '2017-05-15 12:24:56+00');

INSERT INTO users
  (cb_id, fullName, sex, yearOfBirth, email, date, hash, phone, is_email_contact_consent_granted, is_sms_contact_consent_granted)
VALUES
  (1, 'james bond', 'male', 1984, 'hello@yahoo.com', '2017-05-15 12:24:57+00', '9fb59d630d2fb12f7478c56c5f1b2fff20e0dd7c9d3a260eee7308a8eb6cd955', 07538654284, true, true),
  (1, 'britney spears', 'female', 1982, 'goodbye@gmail.com', '2017-05-15 12:24:56+00', '9b57815dcc7568e942baed14c61f636034f138e5f43d72f26ec32a9069f9d7df', 07493418465, true, false),
  (1, 'aldous huxley', 'female', 1993, 'sometimes@gmail.com', '2017-05-15 12:24:52+00', 'bcec143de6d9e45c28a9a376f1728f8227e36586ad0a770cf1417b282f1d1afa', 07449677193, false, true),
  (3, 'yusra mardini', 'female', 1998, 'maemail@gmail.com', '2017-05-15 12:24:52+00', 'bcec143de6d9e45c28a9a376f1728f8227e36586ad0a770cf1417b282f1d1afa', 07835110026, false, false);

INSERT INTO activities
  (name, cb_id, deleted, monday, tuesday, wednesday, thursday, friday, saturday, sunday, date)
VALUES
  ('Yoga', 1, false, true, true, true, true, true, false, false, '2017-05-15 12:24:57+00'),
  ('French Lessons', 1, false, true, true, true, true, true, false, false, '2017-12-22 12:24:57+00'),
  ('Baking Lessons', 1, false, true, true, true, true, true, false, false, '2017-11-13 12:24:57+00'),
  ('Self-Defence Class', 1, false, true, true, true, true, true, false, false, '2018-01-02 12:24:57+00'),
  ('Flamenco Dancing', 1, false, true, true, true, true, true, false, false, '2018-02-15 12:24:57+00'),
  ('Swimming', 3, false, true, true, true, true, true, false, false, '2018-02-15 12:24:57+00');

INSERT INTO visits
  (usersId, activitiesId, cb_id, date)
VALUES
  (1, 4, 1, '2017-05-15 12:24:56+00'),
  (2, 1, 1, '2017-06-21 14:32:30+00'),
  (3, 2, 1, '2017-05-15 12:01:20+00'),
  (1, 3, 1, '2017-07-02 09:57:01+00'),
  (2, 1, 1, '2018-01-23 20:04:17+00'),
  (1, 2, 1, '2018-01-23 20:05:17+00'),
  (3, 2, 1, '2018-01-23 20:06:17+00'),
  (1, 3, 1, '2018-01-23 20:07:17+00'),
  (3, 3, 1, '2018-01-23 20:08:17+00'),
  (2, 4, 1, '2018-01-24 20:09:17+00'),
  (3, 1, 1, '2018-01-24 20:10:17+00'),
  (1, 2, 1, '2018-01-24 20:13:17+00'),
  (3, 2, 1, '2018-01-24 20:23:17+00'),
  (2, 2, 1, '2018-01-24 20:33:17+00'),
  (1, 3, 1, '2018-01-24 20:43:17+00'),
  (3, 1, 1, '2018-01-24 20:53:17+00'),
  (1, 1, 1, '2018-01-24 21:03:17+00'),
  (2, 4, 1, '2018-01-25 20:01:17+00'),
  (1, 1, 1, '2018-01-25 20:02:17+00'),
  (2, 1, 1, '2018-01-25 20:03:17+00'),
  (2, 1, 1, '2018-01-25 20:04:17+00'),
  (2, 2, 1, '2018-01-25 20:05:17+00'),
  (1, 3, 1, '2018-01-25 20:06:17+00'),
  (2, 5, 1, '2018-01-25 20:07:17+00'),
  (1, 3, 1, '2018-01-25 20:08:17+00'),
  (3, 2, 1, '2018-01-25 20:09:17+00'),
  (2, 4, 1, '2018-01-26 20:01:17+00'),
  (1, 1, 1, '2018-01-26 20:02:17+00'),
  (3, 2, 1, '2018-01-26 20:03:17+00'),
  (2, 3, 1, '2018-01-26 20:04:17+00'),
  (1, 5, 1, '2018-01-26 20:05:17+00'),
  (3, 5, 1, '2018-01-26 20:06:17+00'),
  (2, 3, 1, '2018-01-26 20:07:17+00'),
  (2, 1, 1, '2018-01-26 20:08:17+00'),
  (1, 1, 1, '2018-01-26 20:09:17+00'),
  (3, 3, 1, '2018-01-26 20:10:17+00'),
  (3, 4, 1, '2018-01-26 21:03:17+00'),
  (2, 4, 1, '2018-01-27 20:01:17+00'),
  (1, 1, 1, '2018-01-27 20:02:17+00'),
  (3, 2, 1, '2018-01-27 20:03:17+00'),
  (3, 4, 1, '2018-01-27 20:04:17+00'),
  (2, 5, 1, '2018-01-27 20:05:17+00'),
  (3, 2, 1, '2018-01-27 20:06:17+00'),
  (1, 2, 1, '2018-01-27 20:07:17+00'),
  (1, 4, 1, '2018-01-27 20:08:17+00'),
  (2, 4, 1, '2018-01-28 20:09:17+00'),
  (1, 1, 1, '2018-01-28 21:03:17+00'),
  (3, 3, 1, '2018-01-28 22:03:17+00'),
  (2, 3, 1, '2018-01-28 23:03:17+00'),
  (1, 3, 1, '2018-01-28 20:03:27+00'),
  (1, 3, 1, '2018-01-28 20:03:37+00'),
  (3, 4, 1, '2018-01-28 20:03:47+00'),
  (3, 5, 1, '2018-01-28 20:03:57+00'),
  (2, 2, 1, '2018-01-28 20:03:07+00'),
  (1, 1, 1, '2018-01-28 21:13:17+00'),
  (3, 1, 1, '2018-01-28 20:13:17+00'),
  (1, 1, 1, '2018-01-28 20:23:17+00'),
  (2, 4, 1, '2017-04-29 20:33:17+00'),
  (2, 4, 1, '2017-04-29 20:43:17+00'),
  (2, 4, 1, '2017-04-29 20:53:17+00'),
  (2, 4, 1, '2017-04-29 21:03:17+00'),
  (2, 4, 1, '2017-04-29 22:03:17+00'),
  (3, 5, 1, '2017-06-22 17:45:00+00'),
  (4, 6, 3, '2017-04-29 22:03:17+00'),
  (4, 6, 3, '2017-06-22 17:45:00+00');

COMMIT;
