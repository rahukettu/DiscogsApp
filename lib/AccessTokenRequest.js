const getAccessToken = async (oauthVerifier) => {
    try {
      const response = await fetch('https://api.discogs.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `OAuth oauth_verifier="${oauthVerifier}", oauth_consumer_key="<YOUR_CONSUMER_KEY>", oauth_signature_method="PLAINTEXT", oauth_signature="<YOUR_CONSUMER_SECRET>&<TOKEN_SECRET>"`,
        },
      });
      
      const textResponse = await response.text();
      console.log('Access Token Response:', textResponse);
      // Save or use access token
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };
  