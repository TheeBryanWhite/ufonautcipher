const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { wordsService } = require('../services');

const createWord = catchAsync(async (req, res) => {
  const word = await wordsService.createWord(req.body);
  res.status(httpStatus.CREATED).send(word);
});

const getWordsByVal = catchAsync(async (req, res) => {
  const word = await wordsService.getWordsByVal(req.params.cipherVal);
  if (!word) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No words found');
  }
  res.send(word);
});

module.exports = {
  createWord,
  getWordsByVal
};
