const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/storyDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema for stories
const storySchema = new mongoose.Schema({
  prompt: String,
  story: String,
  upvotes: Number,
});
const Story = mongoose.model("Story", storySchema);

// Simulated Database
let stories = [];
const apiKey = "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";

// Middleware to allow cross-origin requests (for development purposes)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/save-story", async (req, res) => {
  const { prompt, story, upvotes } = req.body;

  try {
    const newStory = new Story({
      prompt,
      story,
      upvotes,
    });
    await newStory.save();
    res.json({ message: "Story saved successfully" });
  } catch (error) {
    console.error("Error saving story:", error);
    res.status(500).send("Error saving story");
  }
});

app.post("/upvote-story", async (req, res) => {
  const { storyId } = req.body;

  try {
    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.json({ message: "Upvotes updated successfully", updatedStory });
  } catch (error) {
    console.error("Error updating upvotes:", error);
    res.status(500).send("Error updating upvotes");
  }
});

app.post("/generate-story", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log("Received Prompt:", prompt);

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OpenAI API Response:", response.data);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const generatedStory = response.data.choices[0].text;
    stories.push({ prompt, story: generatedStory, upvotes: 0 });
    res.json({ story: generatedStory });
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).send("Error generating story");
  }
});

// Get Leaderboard Endpoint
app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboardData = await Story.find().sort({ upvotes: -1 }).exec();
    res.json(leaderboardData);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).send("Error fetching leaderboard data");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
