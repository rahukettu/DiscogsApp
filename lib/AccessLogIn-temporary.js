import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

const DiscogsAuthorization = ({ requestToken }) => {
  const [authorizationUrl, setAuthorizationUrl] = useState('');

  useEffect(() => {
    const url = `https://discogs.com/oauth/authorize?oauth_token=${requestToken}`;
    setAuthorizationUrl(url);
  }, [requestToken]);

  return (
    <WebView
      source={{ uri: authorizationUrl }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};
