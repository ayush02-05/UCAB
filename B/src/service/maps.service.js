const axios = require("axios");

const NOMINATIM = "https://nominatim.openstreetmap.org";
const OSRM = "http://router.project-osrm.org";
const PHOTON = "https://photon.komoot.io/api";

const getCoordinatesFromAddress = async (address) => {
  const url = `${NOMINATIM}/search`;

  try {
    const response = await axios.get(url, {
      params: { q: address, format: "json", limit: 1 },
      headers: { "User-Agent": "uCab-App-Project" }, // Required by Nominatim
    });

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return {
      lat: response.data[0].lat,
      lng: response.data[0].lon,
    };
  } catch (error) {
    console.error("Service Error:", error.message);
    throw new Error("Unable to fetch coordinates");
  }
};

const getDistanceTimefromAddress = async (
  originAddress,
  destinationAddress,
) => {
  if (!originAddress || !destinationAddress) {
    throw new Error("Origin and Destination are required");
  }

  // Convert address → coordinates
  const origin = await getCoordinatesFromAddress(originAddress);
  const destination = await getCoordinatesFromAddress(destinationAddress);

  // Routing
  const url = `${OSRM}/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;

  const response = await axios.get(url);

  const route = response.data.routes[0];

  return {
    origin,
    destination,
    distance_meters: route.distance,
    duration_seconds: route.duration,
    distance_km: (route.distance / 1000).toFixed(2),
    duration_minutes: (route.duration / 60).toFixed(2),
  };
};

const getAutoCompleteSuggestions = async (query) => {
  if (!query) {
    throw new Error("Query is required");
  }

  try {
    const response = await axios.get(PHOTON, {
      params: {
        q: query,
        limit: 5,
      },
    });

    return response.data.features.map((place) => ({
      name: place.properties.name,
      city: place.properties.city,
      state: place.properties.state,
      country: place.properties.country,
      lat: place.geometry.coordinates[1],
      lng: place.geometry.coordinates[0],
      full_address:
        place.properties.name + ", " + (place.properties.city || ""),
    }));
  } catch (error) {
    console.error(error.message);
    throw new Error("Unable to fetch suggestions");
  }
};

module.exports = {
  getCoordinatesFromAddress,
  getDistanceTimefromAddress,
  getAutoCompleteSuggestions,
};
