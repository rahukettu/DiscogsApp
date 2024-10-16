const handleWebViewNavigationStateChange = (navState) => {
    if (navState.url.includes('oauth_verifier')) {
      const urlParams = new URLSearchParams(navState.url.split('?')[1]);
      const oauthVerifier = urlParams.get('oauth_verifier');
  
      if (oauthVerifier) {
     //Use oauth_verifier to get the access token
        getAccessToken(oauthVerifier);
      }
    }
  };
  