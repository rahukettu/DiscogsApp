const requestToken = async () => {
    try {
      const response = await fetch('https://api.discogs.com/oauth/request_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'OAuth oauth_consumer_key="<YOUR_CONSUMER_KEY>", oauth_signature_method="PLAINTEXT", oauth_signature="<YOUR_CONSUMER_SECRET>&"',
        },
      });
      
      const textResponse = await response.text();
      console.log('Request Token:', textResponse);
    } catch (error) {
      console.error('Error fetching request token:', error);
    }
  };
  