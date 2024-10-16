import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET } from '@env';

const ArtistSearch = ({ onSelectArtist }) => {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchArtists = async () => {
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=artist&key=${DISCOGS_CONSUMER_KEY}&secret=${DISCOGS_CONSUMER_SECRET}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch artist data');
      }

      const data = await response.json();
      setArtists(data.results);
    } catch (err) {
      setError('Error fetching artists');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for artists by name"
        style={styles.input}
      />
      <Button title="Search" onPress={searchArtists} />
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={artists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectArtist(item.id)}>
            <Text style={styles.artistItem}>{item.title || item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={!loading && <Text>No artists found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', // Ensures the content starts at the top
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 50, // Add margin to push the search box down
  },
  artistItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  errorText: {
    color: 'red',
  },
});

export default ArtistSearch;
