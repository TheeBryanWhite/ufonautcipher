const httpStatus = require('http-status');
const { Words } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a word
 * @param {Object} wordBody
 * @returns {Promise<Word>}
 */
const createWord = async (wordBody) => {
  if (await Words.doesWordExist(wordBody.queryString)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This word is already in the database');
  }
  const word = await Words.create(wordBody);
  return word;
};

/**
 * Query for words by value
 * @param {Object} wordBody
 * @returns {Promise<QueryResult>}
 */
const getWordsByVal = async (val) => {
  const arr = [parseInt(val)];
  const words = await Words.find({cipherVal: arr});
  return words;
};

module.exports = {
  createWord,
  getWordsByVal
};
