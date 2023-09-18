import React, { useContext } from "react";
import axios from "axios";
import { StoryContext } from "./StoryContext";

function GeneratedStory({ story, prompt, id, onUpvote }) {
  const { setLeaderboardData } = useContext(StoryContext);
  const handleSave = () => {
    axios
      .post("http://localhost:5000/save-story", { prompt, story, upvotes: 0 })
      .then((response) => {
        console.log("Story saved successfully:", response.data);
        setLeaderboardData((prevData) => [
          ...prevData,
          { prompt, story, upvotes: 0 },
        ]);
      })
      .catch((error) => {
        console.error("Error saving story:", error);
      });
  };

  const handleWhatsAppShare = () => {
    const text = "Check out this generated story:\n" + story;

    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      text
    )}`;

    // Open a new window to share on WhatsApp
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="generated-story">
      <h2>Generated Story</h2>
      <p>{story}</p>
      <div className="actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleWhatsAppShare}>Share on WhatsApp</button>
      </div>
    </div>
  );
}

export default GeneratedStory;
