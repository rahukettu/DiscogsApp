const oauth = require('oauth'); // Make sure to install the oauth library
const express = require('express');

const app = express();
const PORT = 3000;

const consumer = new oauth.OAuth(
  'https://api.discogs.com/oauth/request_token',
  'https://api.discogs.com/oauth/access_token',
  'YOUR_CONSUMER_KEY', // Replace with your Consumer Key
  'YOUR_CONSUMER_SECRET', // Replace with your Consumer Secret
  '1.0A',
  'http://localhost:8081/callback', // Your callback URL
  'HMAC-SHA1'
);

app.get('/request_token', (req, res) => {
  consumer.getOAuthRequestToken((error, oauth_token, oauth_token_secret) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error obtaining request token');
      return;
    }
    // Store the oauth_token_secret in session or database for later use
    req.session.oauth_token_secret = oauth_token_secret;
    res.redirect(`https://discogs.com/oauth/authorize?oauth_token=${oauth_token}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});