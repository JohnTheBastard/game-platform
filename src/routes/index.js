var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post( '/', (req,res) => {
    res.send('posted to index:' + req.body);
});

router.put( '/:id', (req,res) => {} );

router['delete']( '/:id', (req,res) => {} );

module.exports = router;
