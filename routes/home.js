const express = require('express');
const router  = express.Router();
const faker = require('faker');

const cookie = 'tweets';
tweets = [];
tweeter = {};

router.get('/', function(req, res) {
  res.render('home/index');
});

router.get('/dashboard', function(req, res) {
  res.render('home/dashboard', {faker, tweets});
});

router.post('/dashboard', function(req, res) {
  const params = req.body;
  let tweet =  {name: params.name, body: params.message.slice(0)};
  tweets.push(tweet);
  res.cookie(cookie,tweets);
  sortTweets(tweets);
  res.redirect('/dashboard');
});

function sortTweets(tweets) {
  tweets = tweets.sort(function (a, b) {
    return a.body.length - b.body.length;
  }).reverse();
  return tweets;
}


module.exports = router;
