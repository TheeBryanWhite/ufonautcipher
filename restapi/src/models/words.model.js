const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const wordsSchema = mongoose.Schema(
  {
    cipherVal: {
      type: Array,
      required: true,
    },
    processedString: {
      type: Array,
      required: true,
    },
    queryString: {
      type: String,
      required: true,
      trim: true,
    },
    queryVal: {
      type: Array,
      required: true,
    },
    totalSum: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
wordsSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param {string} word - The submitted word
 * @param {ObjectId} [excludeWordId] - The id of the word to be excluded
 * @returns {Promise<boolean>}
 */
wordsSchema.statics.doesWordExist = async function (queryString) {
  const theWord = await this.findOne({ queryString: queryString });
  return !!theWord;
};

/**
 * @typedef Words
 */
const Words = mongoose.model('Words', wordsSchema);

module.exports = Words;
