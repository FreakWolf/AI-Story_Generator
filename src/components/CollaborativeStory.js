// CollaborativeStory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CollaborativeStory() {
  const [storyParts, setStoryParts] = useState([]);
  const [newPart, setNewPart] = useState('');

  useEffect(() => {
    // Fetch story parts from the server
    axios.get('http://localhost:5000/collaborative-story')
      .then(response => {
        setStoryParts(response.data);
      })
      .catch(error => {
        console.error('Error fetching collaborative story:', error);
      });
  }, []);

  const handleAddPart = () => {
    // Send the new part to the server
    axios.post('http://localhost:5000/collaborative-story', { part: newPart })
      .then(response => {
        setStoryParts([...storyParts, response.data]);
        setNewPart('');
      })
      .catch(error => {
        console.error('Error adding collaborative story part:', error);
      });
  };

  return (
    <div className="collaborative-story">
      <h2>Collaborative Story</h2>
      <ul>
        {storyParts.map((part, index) => (
          <li key={index}>{part}</li>
        ))}
      </ul>
      <textarea
        value={newPart}
        onChange={(e) => setNewPart(e.target.value)}
        placeholder="Add your part..."
      />
      <button onClick={handleAddPart}>Add Part</button>
    </div>
  );
}

export default CollaborativeStory;
