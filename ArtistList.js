import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// ArtistList.js
const ArtistList = ({ artist }) => {
  // Log the artist prop to debug any issues with incoming data
  console.log('Artist data received:', artist);

  // Check for required properties
  if (!artist || !artist.name) {
    return <Text>No artist information available.</Text>; 
  }

  const { name, image_url } = artist; // Destructure the artist object

  return (
    <View style={styles.artistItem}>
      {/* Check if artist has an image URL, else use a placeholder */}
      <Image 
        source={image_url ? { uri: image_url } : require('./assets/placeholder.png')} // Use conditional rendering for the image
        style={styles.artistImage} 
      />
      <Text style={styles.artistName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  artistItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row', // For side-by-side layout
    alignItems: 'center', // Center the items vertically
  },
  artistImage: {
    width: 50, // Adjust based on your design
    height: 50, // Adjust based on your design
    borderRadius: 25, // For circular images
    marginRight: 10, 
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ArtistList;
