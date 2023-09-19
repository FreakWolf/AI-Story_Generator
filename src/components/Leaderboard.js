import React, { useContext, useEffect } from "react";
import axios from "axios";
import { StoryContext } from "./StoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

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

  const handleWhatsAppShare = (story) => {
    const text = "Check out this generated story:\n" + story;

    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboardData.map((story) => (
          <li key={story._id}>
            <p className="heading">
              <strong>Prompt:</strong> {story.prompt}
            </p>
            <div className="container">
              <p>
                <strong>Story:</strong> {story.story}
              </p>
            </div>
            <p className="heading">
              <strong>Likes:</strong> {story.upvotes}
            </p>
            <div className="button-container">
              <button
                className="upvote"
                onClick={() => handleUpvote(story._id)}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ marginRight: "5px" }}
                />
                Like
              </button>
              <button
                className="share-btn"
                onClick={() => handleWhatsAppShare(story.story)}
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  style={{ marginRight: "5px" }}
                />
                Share on WhatsApp
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
