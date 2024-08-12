const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Banner = require("./models/Banner");
const connectToDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDB();

// Define the API routes
app.get("/api/banner", async (req, res) => {
  try {
    const banner = await Banner.findOne();
    if (!banner) {
      return res.status(404).json({ error: "No banner found" });
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch banner" });
  }
});

app.post("/api/banner", async (req, res) => {
  const { description, timer, link, visible } = req.body;
  try {
    const banner = await Banner.findOne();
    if (banner) {
      banner.description = description;
      banner.timer = timer;
      banner.link = link;
      banner.visible = visible;
      await banner.save();
    } else {
      const newBanner = new Banner({ description, timer, link, visible });
      await newBanner.save();
    }
    res.status(200).json({ success: "Banner updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save banner" });
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
