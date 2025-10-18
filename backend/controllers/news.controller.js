import fetch from "node-fetch";

const reverseGeocode = async (lat, lon) => {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.OPENCAGE_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("Reverse Geocode API Response:", data);
    if (data?.results?.length > 0) {
      return (
        data.results[0].components.city ||
        data.results[0].components.town ||
        data.results[0].components.state ||
        "Unknown Location"
      );
    }
    return "Unknown Location";
  } catch (err) {
    console.error("Reverse Geocode Error:", err);
    return "Unknown Location";
  }
};

const fetchCityNews = async (city) => {
  try {
    const url = `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_KEY}&q=${city}&language=en`;
    const res = await fetch(url);
    const data = await res.json();

    console.log("News API Response:", data);

    return data?.results || [];
  } catch (err) {
    console.error("Fetch City News Error:", err);
    return [];
  }
};

export const getNewsByLocation = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    console.log("📍 Received request for news at:", lat, lon);

    if (!lat || !lon) {
      return res.status(400).json({
        status: "fail",
        message: "Latitude and Longitude required",
      });
    }

    const city = await reverseGeocode(lat, lon);
    console.log("🏙 Resolved city:", city);

    const newsList = await fetchCityNews(city);
    console.log("📰 Fetched news count:", newsList.length);

    newsList.forEach((n, i) => console.log(`Title ${i + 1}: ${n.title}`));

    return res.status(200).json({
      status: "success",
      data: { city, news: newsList },
      message: newsList.length
        ? "News fetched successfully"
        : "No news found for this location",
    });
  } catch (err) {
    console.error("News Controller Error:", err);
    return res.status(500).json({
      status: "error",
      message: "Error fetching news",
      error: err.message,
    });
  }
};

// You can export the helper functions as well if they need to be tested or used elsewhere
export { reverseGeocode, fetchCityNews };