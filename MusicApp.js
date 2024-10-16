import React, { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, Text, Button } from 'react-native';
import ArtistList from './ArtistList'; // Component for displaying artists
import ReleaseList from './ReleaseList'; // Component for displaying releases
import Search from './Search'; // Component for search functionality

const MusicApp = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isArtistSearch, setIsArtistSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Search input state

  const setInitialData = async () => {
    setLoading(true);
    // Simulate fetching initial data if necessary
    // await fetchInitialData();
    setLoading(false);
  };

  // To fetch initial data when the component mounts
  useEffect(() => {
    setInitialData(); // Call the function to fetch initial data
  }, []);

  // Function to handle a new search
  const handleNewSearch = () => {
    setResults([]); // Clear previous results
    setSearchQuery(''); // Clear search input
  };

  // Render header component
  const renderHeader = () => (
    <View style={styles.header}>
      <Button
        title={`Switch to ${isArtistSearch ? 'Releases' : 'Artists'}`}
        onPress={() => {
          setIsArtistSearch((prev) => !prev);
          handleNewSearch(); // Reset search state when switching
        }}
      />
      <Search 
        isArtistSearch={isArtistSearch} 
        setResults={setResults} // Update results based on search
        setSearchQuery={setSearchQuery} // Pass setSearchQuery to update the query
      />
      <Text style={styles.headerText}>
        {isArtistSearch ? 'Artist List' : 'Release List'}
      </Text>
    </View>
  );

  if (loading) {
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
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  // Check if results are empty
  if (results.length === 0 && searchQuery) {
    return (
      <View style={styles.centered}>
        <Text>No results found.</Text>
        <Button 
          title="New Search" // Button title
          onPress={handleNewSearch} // Reset search state
        />
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => 
        isArtistSearch ? (
          <ArtistList artist={item} />  // Render artist list
        ) : (
          <ReleaseList release={item} />  // Render release list
        )
      }
    /> 
  );
};

// Styling for the component
const styles = {
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 10,
    marginTop: 50,
    backgroundColor: '#e39e6d',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
};

export default MusicApp;
