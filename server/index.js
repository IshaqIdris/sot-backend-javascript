const Twitter = require('twitter');
const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  });

app.use(express.static(path.join(__dirname, '../public')));
//app.get('/', (req, res) => res.send('Hello World!'));



const subjects = [];

app.post('/api/subjects', (request, response) => {
    let newSubject = request.body.subject;
    subjects.push(newSubject);

    response.redirect('/'); // Refresh page
});

const myData = {
    statuses: [
        { text: 'hello im a tweet'}
    ]
};

app.get('/api/subjects', (request, response) => {
    response.json(subjects);
});

app.get('/api/results', (req, res) => {
    client.get('search/tweets', { q: subjects.join(' OR '), count: 100 }, function(error, tweets, response) {
        res.json(tweets);
    });
});

app.listen(3000, () => console.log('Our app is listening on port 3000!'));