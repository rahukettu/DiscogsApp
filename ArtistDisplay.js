import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, RefreshControl } from 'react-native';
import fetchArtists from './fetchArtists'; 
import ArtistList from './ArtistList'; 

const ArtistDisplay = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadArtists = async () => {
    setLoading(true);
    setError(''); // Clear any previous error
    try {
      const data = await fetchArtists();
      
      // Ensure the data is an array, otherwise set an error
      if (Array.isArray(data)) {
        setArtists(data);
      } else {
        setError('Unexpected data format');
      }
    } catch (err) {
      setError('Failed to fetch artists');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtists();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadArtists().finally(() => setRefreshing(false));
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={loadArtists}>Tap to retry</Text>
      </View>
    );
  }

  if (artists.length === 0) {
    return <Text style={styles.noDataText}>No artists found.</Text>;
  }

  return (
    <FlatList
      data={artists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ArtistList artist={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    padding: 20,
    textAlign: 'center',
  },
  retryText: {
    color: '#007bff',
    padding: 10,
    textAlign: 'center',
  },
  noDataText: {
    padding: 20,
    textAlign: 'center',
  },
});

export default ArtistDisplay;