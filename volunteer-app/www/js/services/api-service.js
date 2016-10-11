/*
* CONTENTS
*
* api service
*    url
*    logs
*      delete
*      get logs
*      get log
*      edit log
*      new log
*    user
*      login
*      save user
*      register user
*      total hours
*    genders
*      get genders
*    regions
*      get regions
*    organisations
*      get organisations
*      summary
*/

/*
	> api service
	  - handles all interactions with the api
*/

	angular.module('app.services').factory('$$api', function($http, $rootScope) {

		var $$api = {

			/*
				>> url
				  generates an api url e.g. 'user' returns 'http://powertochangeadmindev.stage2.reason.digital/api/v1/user'
	              the environment can be set in options in options.js
			*/

				url: function(url) {
					return options.apiBaseUrl[options.environment] + url;
					// return 'http://powertochangeadmindev.stage2.reason.digital/api/v1/' + url;
				},

			/*
				>> logs
			*/

				logs: {

					/*
						>>> delete
					*/

						delete: function(id) {
							return $http({
								method: 'DELETE',
							  	url: $$api.url('logs/' + id)
							});
						},

					/*
						>>> get logs
					*/

						getLogs: function(userId) {
							return $http({
								method: 'GET',
								url: $$api.url('logs/user/' + userId)
							});
						},

					/*
						>>> get log
					*/

						getLog: function(logId) {
							return $http({
								method: 'GET',
								url: $$api.url('logs/' + logId)
							});
						},

					/*
						>>> edit log
					*/

						edit: function(logId, data) {
							return $http({
								method: 'PUT',
								url: $$api.url('logs/' + logId),
								data: data,
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
							});
						},

					/*
						>>> new log
					*/

						new: function(data) {
							return $http({
								method: 'POST',
								url: $$api.url('logs'),
								data: data,
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
							});
						},

				},

			/*
				>> user
			*/

				user: {

					/*
						>>> login
					*/

						login: function(data) {
							return $http({
								method: 'POST',
								url: $$api.url('users/login'),
								data: data,
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
							});
						},

					/*
						>>> save user
					*/

						save: function(userId, data) {
							return $http({
								method: 'PUT',
								url: $$api.url('users/' + userId),
								data: data,
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
							});
						},

					/*
						>>> register user
					*/

						register: function(data) {
							return $http({
								method: 'POST',
								url: $$api.url('users'),
								data: data,
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
							});
						},

					/*
						>>> total hours
					*/

						totalHours: function(userId, days) {
							// if days have been specified, grab last x days
							if (days) {
								var url = $$api.url('logs/user/' + userId + '/total/days/' + days)
							}
							// else just grab overall total hours
							else {
								var url = $$api.url('logs/user/' + userId + '/total')
							}
							return $http({
								method: 'GET',
								url: url
							});
						},

				},

			/*
				>> genders
			*/

				genders: {

					/*
						>>> get genders
					*/

						get: function() {
							return $http({
								method: 'GET',
								url: $$api.url('genders')
							});
						}

				},

			/*
				>> regions
			*/

				regions: {

					/*
						>>> get regions
					*/

						get: function() {
							return $http({
								method: 'GET',
								url: $$api.url('regions')
							});
						}

				},

			/*
				>> organisations
			*/

				organisations: {

					/*
						>>> get organisations
					*/

						get: function(regionId) {
							return $http({
								method: 'GET',
								url: $$api.url('regions/' + regionId + '/organisations')
							});
						},

					/*
						>>> summary
					*/

						summary: function(organisationId) {
							return $http({
								method: 'GET',
								url: $$api.url('organisations/' + organisationId + '/summary')
							})
						} 

				},

		}

		return $$api;

	})