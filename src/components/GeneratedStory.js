import React, { useContext } from "react";
import axios from "axios";
import { StoryContext } from "./StoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";

function GeneratedStory({ story, prompt }) {
  const { setLeaderboardData } = useContext(StoryContext);
  const handleSave = () => {
    axios
      .post("https://ai-story-generator-freakwolf.netlify.app/save-story", { prompt, story, upvotes: 0 })
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
      <div className="container">
        <p>{story}</p>
      </div>
      <div className="button-container">
        <div className="actions">
          <button className="save-btn" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
            Save
          </button>
          <button className="share-btn" onClick={handleWhatsAppShare}>
            <FontAwesomeIcon icon={faWhatsapp} style={{ marginRight: "5px" }} />
            Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export default GeneratedStory;
