import React, { useState } from "react";
import StoryForm from "./components/StoryForm";
import GeneratedStory from "./components/GeneratedStory";
import Leaderboard from "./components/Leaderboard";
import axios from "axios";

function App() {
  const [generatedStory, setGeneratedStory] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const handleUpvote = (id) => {
    axios
      .post(
        "http://localhost:5000/upvote-story",
        { storyId: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error upvoting story:", error);
      });
  };

  const handleGenerateStory = (prompt) => {
    axios
      .post(
        "http://localhost:5000/generate-story",
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setGeneratedStory(response.data.story);
        setGeneratedPrompt(prompt);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="app">
      <h1>Story Generator</h1>
      <StoryForm onGenerateStory={handleGenerateStory} />
      {generatedStory && <GeneratedStory story={generatedStory} prompt={generatedPrompt} onUpvote={handleUpvote} />}
      <Leaderboard />
    </div>
  );
}

export default App;
