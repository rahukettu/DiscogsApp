import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';
import { DISCOGS_CONSUMER_KEY, ACCESS_TOKEN } from '@env';

const Search = ({ isArtistSearch, setResults, setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    const fetchURL = isArtistSearch
      ? `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=artist&key=${DISCOGS_CONSUMER_KEY}`
      : `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release&key=${DISCOGS_CONSUMER_KEY}`;

    try {
      const response = await fetch(fetchURL, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'User-Agent': 'MusicApp/1.0 +https://api.discogs.com/',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data.results || []);
      setSearchQuery(query); // Update the search query
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={`Search for ${isArtistSearch ? 'artists' : 'releases'}`}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
});

export default Search;
