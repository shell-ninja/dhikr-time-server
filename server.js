import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("The server is running");
});

app.get("/api/prayer", async (req, res) => {
  const { lat, lon, method, school } = req.query;

  if (!lat || !lon || !method || !school) {
    return res.status(400).json({
      error: "Missing required query parameters",
      received: req.query,
    });
  }

  try {
    const url = `https://islamicapi.com/api/v1/prayer-time/?lat=${lat}&lon=${lon}&method=${method}&school=${school}&api_key=${process.env.API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      console.error("IslamicAPI error:", text);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch prayer times" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
