import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors()); // allow requests from your frontend

app.get("/api/prayer", async (req, res) => {
  const { lat, lon, method, school } = req.query;

  console.log(lat, lon, method, school);
  try {
    const response = await fetch(
      `https://islamicapi.com/api/v1/prayer-time/?lat=${lat}&lon=${lon}&method=${method}&school=${school}&api_key=${process.env.API_KEY}`,
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch prayer times" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
