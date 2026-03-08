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

const getDistanceTimefromAddress = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("picup and Destination are required");
  }

  // Convert address → coordinates
  const origin = await getCoordinatesFromAddress(pickup);
  const drop = await getCoordinatesFromAddress(destination);

  // Routing
  const url = `${OSRM}/route/v1/driving/${origin.lng},${origin.lat};${drop.lng},${drop.lat}?overview=false`;

  const response = await axios.get(url);

  const route = response.data.routes[0];

  return {
    origin,
    drop,
    distance_meters: route.distance,
    duration_seconds: route.duration,
    distance_km: (route.distance / 1000).toFixed(2),
    duration_minutes: (route.duration / 60).toFixed(2),
  };
};

const getAutoCompleteSuggestions = async (query, localCity = "Jabalpur") => {
  if (!query) throw new Error("Query is required");

  try {
    // fetch from Photon (real global suggestions)
    const response = await axios.get("https://photon.komoot.io/api", {
      params: {
        q: query,
        limit: 10, // get extra results to sort
      },
    });

    // map results
    const suggestions = response.data.features.map((place) => ({
      name: place.properties.name,
      city: place.properties.city,
      state: place.properties.state,
      country: place.properties.country,
      lat: place.geometry.coordinates[1],
      lng: place.geometry.coordinates[0],
      full_address:
        place.properties.name +
        (place.properties.city ? ", " + place.properties.city : "") +
        (place.properties.state ? ", " + place.properties.state : "") +
        (place.properties.country ? ", " + place.properties.country : ""),
    }));

    // sort: local city first, then others
    suggestions.sort((a, b) => {
      const aLocal = a.city && a.city.toLowerCase() === localCity.toLowerCase();
      const bLocal = b.city && b.city.toLowerCase() === localCity.toLowerCase();

      if (aLocal && !bLocal) return -1; // a first
      if (!aLocal && bLocal) return 1; // b first
      return 0; // keep original order otherwise
    });

    // limit results to 5 for frontend
    return suggestions.slice(0, 5);
  } catch (error) {
    console.error("AutoComplete Error:", error.message);
    throw new Error("Unable to fetch suggestions");
  }
};

module.exports = {
  getCoordinatesFromAddress,
  getDistanceTimefromAddress,
  getAutoCompleteSuggestions,
};
