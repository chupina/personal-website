const express = require('express');
const router = express.Router();
const {randomNumber} = require('../utils');
const FileStorage = require('../services/FileStorage');


/* GET /community */
router.get('/', async function(req, res) {
  try {
    const result = await FileStorage.readJsonFile(`community/${randomNumber(1, 3)}.json`);
    await res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

module.exports = router;
