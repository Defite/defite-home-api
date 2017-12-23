const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  const posts = db.collection('posts');

  // Create item
  app.post('/post/create', (req, res) => {
    const post = {
      title: req.body.title,
      text: req.body.text,
      url: req.body.url,
      dates: {
        from: '',
        to: ''
      }
    }

    posts.insert(post, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    })
  });

  // Read item by id
  app.get('/post/getById/:id', (req, res) => {
    const id = req.params.id;

    const details = {
      '_id': new ObjectID(id)
    }

    posts.findOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  // Read item by url
  app.get('/post/getByUrl/:url', (req, res) => {
    const url = req.params.url;

    const details = {
      'url': url
    }

    posts.findOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  // Get all items
  app.get('/posts/all', (req, res) => {
    posts.find().toArray((err, result) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result);
      }
    })
  });

  // Update item
  app.put('/post/update/:id', (req, res) => {
    const id = req.params.id;

    const details = {
      '_id': new ObjectID(id)
    }

    const post = {
      title: req.body.title,
      text: req.body.text,
      url: req.body.url,
      dates: {
        from: '',
        to: ''
      }
    }

    posts.update(details, post, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(resumeItem);
      }
    })
  });

  // Delete item
  app.delete('/post/delete/:id', (req, res) => {
    const id = req.params.id;

    const details = {
      '_id': new ObjectID(id)
    }

    posts.remove(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    })
  });
};
