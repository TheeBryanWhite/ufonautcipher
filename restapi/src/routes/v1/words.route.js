const express = require('express');
const validate = require('../../middlewares/validate');
const wordsValidation = require('../../validations/words.validation');
const wordsController = require('../../controllers/words.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(wordsValidation.createWord), wordsController.createWord)

router
  .route('/:cipherVal')
  .get(validate(wordsValidation.getWordsByVal), wordsController.getWordsByVal)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Words
 *   description: Lexicanum management and retrieval
 */

/**
 * @swagger
 * /words:
 *   post:
 *     summary: Create a word
 *     description: Adds new words to the dictionary
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cipherVal
 *               - processedString
 *               - queryString
 *               - queryVal
 *               - totalSums
 *             properties:
 *               cipherVal:
 *                 type: array
 *               processedString:
 *                 type: array
 *               queryString:
 *                 type: string
 *               queryVal:
 *                  type: array
 *               totalSum:
 *                  type: array
 *             example:
 *               cipherVal: [93]
 *               processedString: [tahuti]
 *               queryString: tahuti
 *               queryVal: [93]
 *               totalSum: [93]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Words'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /words/{cipherVal}:
 *   get:
 *     summary: Get words by value
 *     description: Get all words with the same cipher value as the value provided
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: cipherVal
 *         required: true
 *         schema:
 *           type: number
 *         description: Cipher value
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Words'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
