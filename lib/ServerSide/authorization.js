app.get('/callback', (req, res) => {
    const { oauth_token, oauth_verifier } = req.query;
    const oauth_token_secret = req.session.oauth_token_secret; // Retrieve the stored secret
  
    consumer.getOAuthAccessToken(
      oauth_token,
      oauth_token_secret,
      oauth_verifier,
      (error, access_token, access_token_secret) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error obtaining access token');
          return;
        }
        // Store access_token and access_token_secret for future API requests
        console.log('Access Token:', access_token);
        console.log('Access Token Secret:', access_token_secret);
        res.send('Successfully authorized! You can now use the API.');
      }
    );
  });
  