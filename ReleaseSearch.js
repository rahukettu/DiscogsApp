import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { DISCOGS_CONSUMER_KEY, ACCESS_TOKEN } from '@env';

const ReleaseSearch = () => {
  const [releaseQuery, setReleaseQuery] = useState(''); 
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  const fetchReleases = async (page = 1) => {
    if (!releaseQuery.trim()) {
      setError('Please enter a search term.');
      return; 
    }

    setLoading(true);
    setError(''); // Clear error before fetching

    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?q=${encodeURIComponent(releaseQuery)}&type=release&key=${DISCOGS_CONSUMER_KEY}&page=${page}&per_page=15`,
        {
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'User-Agent': 'MusicApp/1.0 +https://api.discogs.com/',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();

      if (data && data.results.length > 0) {
        setReleases((prev) => (page === 1 ? data.results : [...prev, ...data.results])); // Append results for pagination
        setTotalPages(data.pagination.pages); // Update total pages from API response
      } else {
        setReleases([]);
        setError('No releases found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch releases. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1); // Reset page to 1 for new search
    fetchReleases(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchReleases(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchReleases(prevPage);
    }
  };

  return (
    <View style={styles.container}> 
      <TextInput
        value={releaseQuery}
        onChangeText={setReleaseQuery}
        placeholder="Search for releases"
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={releases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.releaseItem}>{item.title || item.name}</Text>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No releases found.</Text>}
      />

      {/* Pagination Controls */}
      {releases.length > 0 && (
        <View style={styles.pagination}>
          <Button title="Previous" onPress={handlePreviousPage} disabled={page === 1} />
          <Text style={styles.pageInfo}>Page {page} of {totalPages}</Text>
          <Button title="Next" onPress={handleNextPage} disabled={page === totalPages} />
        </View>
      )}
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  releaseItem: { 
    padding: 10,
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageInfo: {
    fontSize: 16,
  },
});

export default ReleaseSearch;
