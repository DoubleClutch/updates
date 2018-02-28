const fake = require('faker');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/updates');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MONGO GOD');
});

const postSchema = mongoose.Schema({
  projectId: Number,
  posts: Array,
  founded: Date,
});

const post = mongoose.model('Post', postSchema);

let fakeData = [];
for (let i=0; i < 200; i++) {
  let project = {
    projectId: i,
    posts: [],
    founded: fake.date.past(),
  };
  for (let j=0; j< 4;j++ ) {
    project.posts.push({
      postId: Number(`${i}${j}`),
      article: fake.lorem.paragraphs(),
      date: fake.date.recent(),
      title: fake.lorem.words(),
    });
  }
  fakeData.push(project)
}

fakeData.forEach(ele => {
  let project = new post(ele);
  project.save();
})
