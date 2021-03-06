const express = require('express');
const db = require('../database/db.js');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(parser.json());

const distPath = path.join(__dirname, '../dist');

app.use(express.static(distPath));
app.use('/:id', express.static(distPath));

app.get(`/blogs/:id`, function(req, res, next) {
  db.findPost({postId: req.params.id})
    .exec((err, post) => res.send(post))
});

app.get('/api/:id', function(req,res,next) {
  db.findProject({projectId: req.params.id})
    .populate('posts')
    .exec((err, project) => res.send(project))
});

app.put(`/api/likePUT/:id`, function(req,res,next) {
  db.findPostAndUpdate(req.params.id, req.body);
  res.sendStatus(204);
});

app.listen(3003);
console.log('Listening on port 3003');