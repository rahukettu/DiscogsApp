import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ArtistSearch from './ArtistSearch';
import ArtistInfo from './ArtistInfo';

const App = () => {
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const handleNewSearch = () => {
    setSelectedArtistId(null); // Reset selected artist to null to show search screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Conditional Rendering */}
      {selectedArtistId ? (
        <ArtistInfo artistId={selectedArtistId} onNewSearch={handleNewSearch} />
      ) : (
        <ArtistSearch onSelectArtist={setSelectedArtistId} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default App;
