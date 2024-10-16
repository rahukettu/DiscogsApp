import { DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET, ACCESS_TOKEN } from '@env';

// Function to search for artists by name
const fetchArtistsByName = async (artistName, page = 1, perPage = 15) => {
    if (!artistName) {
      console.warn('No artist name provided, returning empty array.');
      return [];
    }
  
    try {
      const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(artistName)}&type=artist&key=${DISCOGS_CONSUMER_KEY}&secret=${DISCOGS_CONSUMER_SECRET}&page=${page}&per_page=${perPage}`;
      console.log(`Fetching artists from URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'User-Agent': '"MusicApp/1.0"',
        },
      });
  
      // Check for response statuses
      if (!response.ok) {
        const errorData = await response.json(); 
        console.error(`Network response was not ok: ${response.status} - ${response.statusText}`, errorData);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Fetched Data:', data);
  
      // Ensure the results are returned in an array
      if (Array.isArray(data.results)) {
        return data.results; // Return the results from the search
      } else {
        throw new Error('Expected results to be an array.');
      }
    } catch (error) {
      console.error("Error fetching artists by name:", error.message);
      return [];  // Return an empty array on error
    }
  };
  

export default fetchArtistsByName;
