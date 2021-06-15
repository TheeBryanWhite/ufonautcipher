const Joi = require('joi');

const createWord = {
  body: Joi.object().keys({
    cipherVal: Joi.array().required(),
    processedString: Joi.array().required(),
    queryString: Joi.string().required(),
    queryVal: Joi.array().required(),
    totalSum: Joi.array().required()
  }),
};

const getWordsByVal = {
  query: Joi.object().keys({
    cipherVal: Joi.array(),
  }),
};


module.exports = {
  createWord,
  getWordsByVal
};
