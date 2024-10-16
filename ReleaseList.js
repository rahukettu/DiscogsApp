import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ReleaseList = ({ release }) => {
  return (
    <View style={styles.releaseItem}>
      {/* Check if release has an image URL, else use a placeholder */}
      {release.image_url ? (
        <Image source={{ uri: release.image_url }} style={styles.releaseImage} />
      ) : (
        <Image source={require('./assets/placeholder.png')} style={styles.releaseImage} /> // Local placeholder image
      )}
      <Text style={styles.releaseName}>{release.title || release.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  releaseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row', // For side-by-side layout
    alignItems: 'center', // Center the items vertically
  },
  releaseImage: {
    width: 50, // Adjust based on your design
    height: 50, // Adjust based on your design
    borderRadius: 25, // For circular images
    marginRight: 10, // Space between image and text
  },
  releaseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReleaseList;