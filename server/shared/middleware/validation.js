/*
 * Validation related middlewares
 */
const Joi = require('joi');
const { pick, omit } = require('ramda');
const { TESTING } = require('../../../config');

/**
 * Middleware generator to be used in route definitions together
 * with Joi schemas.
 *
 * @example
 * const schemas = { body: { foo: Joi.number() } }
 *
 * app.post('/bar', validate(schemas), (req, res) => {
 *   // ...
 * })
 *
 * @param   {Object}     schemas           Contains validation config for middleware stack
 * @param   {JoiSchema}  [schemas.params]  Schema for path params
 * @param   {JoiSchema}  [schemas.query]   Schema for query params
 * @param   {JoiSchema}  [schemas.body]    Schema for payload params
 * @param   {JoiSchema}  [schemas.headers] Schema for request headers
 * @param   {Object}     [schemas.options] Joi validation options to be merged w/ defaults
 * @returns {Middleware}                   Middleware to be added to the stack
 */
exports.validate = (schemas) => (req, res, next) => {
  const config = req.app.get('cfg');
  const opts = { ...config.validation.options, ...schemas.options };

  return next(
    Object.keys(schemas).reduce((acc, key) => {
      if (acc instanceof Error) {
        return acc;
      }

      const result = Joi.validate(req[key], schemas[key], opts);

      if (result.error) {
        return result.error;
      }

      req[key] = result.value;

      return acc;
    }, null)
  );
};

/**
 * Error middleware to catch errors generated by Joi and
 * send appropriate responses.
 *
 * Mount this onto the main app ahead of more general error
 * handlers
 *
 * @param   {Error}            error  Error generated by upstream middleware
 * @param   {Express.Request}  req    Request object
 * @param   {Express.Response} res    Response object
 * @param   {Function}         next   Callback to pass control downstream
 * @returns {undefined}
 */
exports.validationError = (error, req, res, next) => {
  if (!error.isJoi) {
    return next(error);
  }

  if (req.app.get('cfg').env !== TESTING) {
    console.error(error);
  }

  const validation = error.details
    .map(pick(['message', 'context']))
    .reduce((acc, { context, message }) => {
      const key = context.label || context.key;
      const msg = message.replace(/^"([^"]+)" (.*)/, (match, p1, p2) => p2);

      acc[key] = (acc[key] ? acc[key] : []).concat(msg);
      return acc;
    }, {});

  return res.status(400).send({
    result: null,
    error: omit(['details', '_object'], error),
    validation,
  });
};