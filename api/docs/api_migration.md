# Api Migration

New API can be found in [json format here](./api.json)

## /sectors
/sectors
/sectors/:id

/sectors/:id/feedback
/sectors/:id/visits
/sectors/:id/activities

## /regions
/regions
/regions/:id
`GET` replaces `/regions/{region}/organisations`  ⏱ volunteer app

## /community-businesses
/community-businesses
/community-businesses/:id

### /community-businesses/me
`PUT` replaces `/api/cb/details/update` 👣 visitor app

### /community-businesses/:id/visit_activities
`GET` replaces `/api/activities/today || all` 👣 visitor app // filter used for individual day

`POST` replaces `/api/activity/add` 👣 visitor app

`PUT` replaces `/api/activity/update` 👣 visitor app

`DELETE` replaces `/api/activity/delete` 👣 visitor app

### /community-businesses/:id/feedback
`GET` replaces `/api/cb/feedback` 👣 visitor app

`POST` replaces `/api/cb/feedback` 👣 visitor app

### /community-businesses/:id/users
`GET` replaces `/api/users/all` 👣 visitor app
`GET` replaces `/api/visitors/filtered` 👣 visitor app
`GET` replaces `/api/visitors/all` 👣 visitor app
`GET` replaces `/volunteers/organisation/{organisation}` ⏱ volunteer app
`GET` replaces `/volunteers/organisation360/{organisation}` ⏱ volunteer app

### /community-businesses/:id/visits
`GET` replaces `/api/users/filtered`  👣 visitor app
`GET` replaces `/api/users/chart-all`  👣 visitor app

### /community-businesses/:id/volunteer_logs
`GET` replaces `/organisations/{organisation}/summary` ⏱ volunteer app
`GET` replaces `/logs/admin/{user}` ⏱ volunteer app

/organisations/:id/meetings

### /community-businesses/:id/outreach
`GET` replaces `/outreaches/{organisation}/bytype/{id}` ⏱ volunteer app

## /users (does this want to be broken down for frontline?)
/users
### /users/register
`POST` replaces `/api/cb/register` 👣 visitor app

### /users/login
`POST` replaces `/api/cb/login` 👣 visitor app
`POST` replaces `/api/admin/login` 👣 visitor app
`POST` replaces `/users/login`  ⏱ volunteer app

### /users/:id
### /users/me/volunteers

### /users/me/visitors
`GET` replaces `/api/user/details` 👣 visitor app
`GET` replaces `/api/admin/check` 👣 visitor app
`GET` replaces `/api/user/name-from-scan` 👣 visitor app

`PUT` replaces `/api/qr/generator` 👣 visitor app

### /users/me/organisation
`GET` replaces /api/users/cb-name 👣 visitor app

### /users/password_reset
`POST` replaces `/api/cb/pwd/change` 👣 visitor app
`POST` replaces `/api/cb/pwd/reset` 👣 visitor app

/users/:id/qr_code/email (separate resource?)

### /users/:id/visit_activities/:id
`POST` replaces `/api/visit/add` 👣 visitor app

### /users/:id/volunteer_logs
`GET` replaces `/logs/user/{user}/total` ⏱ volunteer app
`GET` replaces `/logs/user/{user}/total/days/{days}` ⏱ volunteer app

`GET` replaces `/logs/user/{user}` ⏱ volunteer app
`GET` replaces `/logs/user/{user}/total/date/{date}` ⏱ volunteer app


`POST` replaces `/logs/sync` ⏱ volunteer app 🤔 this could _potentially_ need its own route depending on how offline syncing is set up in the app

/users/:id/volunteer_logs/:id

### /users/:id/outreach
`GET` replaces `/meetings/user/{user}` ⏱ volunteer app  NB: this route is currently not being used

`POST` replaces `/meetings/sync` ⏱ volunteer app 🤔 same as `/users/:id/volunteers/:id` sync question

/users/:id/outreach/:id

/users/:id/meetings

/users/:id/meetings/sync (potentially covered by POST)
/users/:id/meetings/:id

/genders

## /outreach
### /outreach/type/:id/campaing_targets
`GET` replaces `/outreachChildTypes/parent/{id}` ⏱ volunteer app

## DEPRECATED Routes
`/survey-answers` ⏱ volunteer app - data to be stored and retrieved from frontline
`/organisations/{organisation}/financial-data` ⏱ volunteer app - data to be stored and retrieved from frontline

## References
- [RESTful API Design Guidelines](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)
- [Best Practices for Pragmatic RESTful API](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)