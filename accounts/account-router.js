const express = require('express');

// database access using knex
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => { // select *
  db
    .select('*')
    .from('accounts')
    .then( accounts => {
      res.status(200).json({ data: accounts })
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({ error: error.message });
    });
});

router.get('/:id', (req, res) => { // select * where id = 
  const id = req.params.id;
  db('accounts')
    .where({ id })
    .select('*')
    .then( accounts => {
      res.status(200).json({ data: accounts })
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({ error: err.message });
    })
});

router.post('/', (req, res) => { // insert into table
  const postData = req.body;
  db('accounts')
  .insert( postData )
  .then ( accounts => {
    res.status(200).json({ data: accounts });
  })
  .catch( err => {
    console.log( err );
    res.status(500).json({ error: err.message });
  })
})

router.put('/:id', (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  db('accounts')
    .where({ id })
    .update( changes )
    .then( accounts => {
      res.status(200).json({ data: accounts });
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({ error: err.message });
    })
})

module.exports = router;