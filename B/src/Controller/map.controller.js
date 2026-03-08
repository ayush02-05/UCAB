const mapServices = require("../service/maps.service");

async function getCoordinates(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const coords = await mapServices.getCoordinatesFromAddress(address);

    if (!coords) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json(coords);
  } catch (error) {
    // This logs the real error to your terminal so you can fix it
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getDistanceTime = async (req, res) => {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({
        message: "Origin and destination required",
      });
    }

    const response = await mapServices.getDistanceTimefromAddress(
      origin,
      destination,
    );

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const { input } = req.query;

    if (!input) {
      return res.status(400).json({
        message: "Search input required",
      });
    }

    const suggestions = await mapServices.getAutoCompleteSuggestions(input);

    res.json(suggestions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getDistanceTime,
};

module.exports = { getCoordinates, getDistanceTime, getSuggestions };
