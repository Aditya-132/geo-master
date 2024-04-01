// Import axios
import axios from 'axios';

// Function to get the latitude and longitude of a location
export async function getLatLong(location) {
  try {
    const response = await axios.get('https://maps-data.p.rapidapi.com/geocoding.php', {
      params: { query: location },
      headers: {
        'X-RapidAPI-Key': '6427a1c601mshb643b104d55f81ap153af0jsn72bb6937987a',
        'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
      }
    });
    return { lat: response.data.data.lat, lng: response.data.data.lng };
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to get nearby places based on latitude and longitude
export async function getNearbyPlaces(location, searchQuery) {
  try {
    const response = await axios.get('https://maps-data.p.rapidapi.com/geocoding.php', {
      params: { query: location },
      headers: {
        'X-RapidAPI-Key': '6427a1c601mshb643b104d55f81ap153af0jsn72bb6937987a',
        'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
      }
    });

    const lat = response.data.data.lat;
    const lng = response.data.data.lng;

    const nearbyPlacesResponse = await axios.get('https://maps-data.p.rapidapi.com/nearby.php', {
      params: {
        query: searchQuery,
        lat: lat,
        lng: lng,
        limit: '20',
        country: 'us',
        lang: 'en',
        offset: '0',
        zoom: '12'
      },
      headers: {
        'X-RapidAPI-Key': '6427a1c601mshb643b104d55f81ap153af0jsn72bb6937987a',
        'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
      }
    });

    return nearbyPlacesResponse.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to calculate distance between two points given their latitude and longitude
export async function calculateDistance(location1, location2) {
  let lat1, lat2, lng1, lng2;
  const Point1 = {
    method: 'GET',
    url: 'https://maps-data.p.rapidapi.com/geocoding.php',
    params: { query: location1 },
    headers: {
      'X-RapidAPI-Key': '6427a1c601mshb643b104d55f81ap153af0jsn72bb6937987a',
      'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
    }
  };

  try {
    // Make geocoding request for location1
    const response1 = await axios.request(Point1);

    // Access latitude and longitude for location1
    lat1 = response1.data.data.lat;
    lng1 = response1.data.data.lng;
  } catch (error) {
    console.error(error);
  }

  const Point2 = {
    method: 'GET',
    url: 'https://maps-data.p.rapidapi.com/geocoding.php',
    params: { query: location2 },
    headers: {
      'X-RapidAPI-Key': '6427a1c601mshb643b104d55f81ap153af0jsn72bb6937987a',
      'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
    }
  };

  try {
    // Make geocoding request for location2
    const response2 = await axios.request(Point2);

    // Access latitude and longitude for location2
    lat2 = response2.data.data.lat;
    lng2 = response2.data.data.lng;
  } catch (error) {
    console.error(error);
  }

  // Calculate distance between the two locations
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d / 1000; // Convert distance to kilometers
}
