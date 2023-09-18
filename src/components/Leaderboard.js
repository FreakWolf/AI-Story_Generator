// Leaderboard.js

import React, { useContext, useEffect } from "react";
import axios from "axios";
import { StoryContext } from "./StoryContext";

function Leaderboard() {
  const { leaderboardData, setLeaderboardData } = useContext(StoryContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/leaderboard")
      .then((response) => {
        setLeaderboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, [setLeaderboardData]);
  const handleUpvote = (storyId) => {
    axios
      .post("http://localhost:5000/upvote-story", { storyId })
      .then((response) => {
        // Update the upvotes in the local state
        setLeaderboardData((prevData) =>
          prevData.map((story) =>
            story._id === storyId
              ? { ...story, upvotes: response.data.updatedStory.upvotes }
              : story
          )
        );
      })
      .catch((error) => {
        console.error("Error upvoting story:", error);
      });
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboardData.map((story) => (
          <li key={story._id}>
            <p>Prompt: {story.prompt}</p>
            <p>Story: {story.story}</p>
            <p>Upvotes: {story.upvotes}</p>
            <button onClick={() => handleUpvote(story._id)}>Upvote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
