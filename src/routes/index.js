var express = require('express');
var router = express.Router();
const path = require('path');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'))
});

router.post( '/', (req,res) => {
    res.send('posted to index:' + req.body);
});

router.put( '/:id', (req,res) => {} );

router['delete']( '/:id', (req,res) => {} );

module.exports = router;
