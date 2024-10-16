import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { DISCOGS_CONSUMER_KEY } from '@env';

const ArtistInfo = ({ artistId, onNewSearch }) => { // Add onNewSearch prop
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArtistInfo();
  }, [artistId]);

  const fetchArtistInfo = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/artists/${artistId}?key=${DISCOGS_CONSUMER_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch artist details');
      }

      const artistData = await response.json();
      setArtist(artistData);
    } catch (err) {
      setError('Error fetching artist details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.artistName}>{artist.name}</Text>
      {artist.images && artist.images.length > 0 && (
        <Image source={{ uri: artist.images[0].uri }} style={styles.artistImage} />
      )}
      <Text>{artist.profile || 'No profile available.'}</Text>
      <Text>{artist.realname || 'No real name available.'}</Text>
      <Text>
        {artist.aliases && artist.aliases.length > 0 
          ? `Aliases: ${artist.aliases.join(', ')}`
          : 'No aliases available.'}
      </Text>
      
      {/* New Search Button */}
      <Button title="New Search" onPress={onNewSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
});

export default ArtistInfo;
