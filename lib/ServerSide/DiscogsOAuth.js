import React, { useEffect } from 'react';
import { Linking } from 'react-native';

const OAuthFlow = () => {
  const oauthConsumerKey = 'DISCOGS_CONSUMER_KEY';
  const oauthConsumerSecret = 'DISCOGS_CONSUMER_SECRET';
  const oauthCallback = 'CALLBACK_URL';

  useEffect(() => {
    const handleDeepLink = (url) => {
      const { queryParams } = Linking.parse(url);
      const oauthToken = queryParams.oauth_token;
      const oauthVerifier = queryParams.oauth_verifier;

      if (oauthToken && oauthVerifier) {
        getAccessToken(oauthToken, oauthVerifier);
      }
    };

    const linkingListener = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      linkingListener.remove();
    };
  }, []);

  const getRequestToken = async () => {
    const requestTokenUrl = 'https://api.discogs.com/oauth/request_token';

    const response = await fetch(requestTokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `OAuth oauth_consumer_key="${oauthConsumerKey}", oauth_callback="${encodeURIComponent(oauthCallback)}"`
      }
    });
    const data = await response.text();
    const params = new URLSearchParams(data);
    return {
      oauthToken: params.get('oauth_token'),
      oauthTokenSecret: params.get('oauth_token_secret')
    };
  };

  const authorize = async () => {
    const { oauthToken } = await getRequestToken();
    const authorizeUrl = `https://discogs.com/oauth/authorize?oauth_token=${oauthToken}`;
    Linking.openURL(authorizeUrl);
  };

  const getAccessToken = async (oauthToken, oauthVerifier) => {
    const accessTokenUrl = 'https://api.discogs.com/oauth/access_token';

    const response = await fetch(accessTokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `OAuth oauth_consumer_key="${oauthConsumerKey}", oauth_token="${oauthToken}", oauth_verifier="${oauthVerifier}"`
      }
    });
    const data = await response.text();
    const params = new URLSearchParams(data);
    return {
      accessToken: params.get('oauth_token'),
      accessTokenSecret: params.get('oauth_token_secret')
    };
  };

  return (
    <View>
      <Button title="Authorize" onPress={authorize} />
    </View>
  );
};

export default OAuthFlow;
