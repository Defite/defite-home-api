const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  const resumeCollection = db.collection('resume');

  // Create item
  app.post('/resume/create', (req, res) => {
    const resumeItem = {
      company: req.body.company,
      url: req.body.url,
      dates: {
        from: '',
        to: ''
      },
      position: req.body.position,
      description: req.body.description
    }

    resumeCollection.insert(resumeItem, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    })
  });

  // Read item
  app.get('/resume/get/:id', (req, res) => {
    const id = req.params.id;

    const details = {
      '_id': new ObjectID(id)
    }

    db.collection('resume').findOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  // Get all items
  app.get('/resume/all', (req, res) => {
    db.collection('resume').find().toArray((err, result) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result);
      }
    })
  });

  // Update item
  app.put('/resume/update/:id', (req, res) => {
    const id = req.params.id;

    const details = {
      '_id': new ObjectID(id)
    }

    const resumeItem = {
      company: req.body.company,
      url: req.body.url,
      dates: {
        from: '',
        to: ''
      },
      position: req.body.position,
      description: req.body.description
    }

    resumeCollection.update(details, resumeItem, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(resumeItem);
      }
    })
  });

  // Delete item
  app.delete('/resume/delete/:id', (req, res) => {
    const id = req.params.id;

    const details = {
      '_id': new ObjectID(id)
    }

    db.collection('resume').remove(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    })
  });
};
