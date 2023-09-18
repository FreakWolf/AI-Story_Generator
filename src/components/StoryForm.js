import React, { useState } from 'react';

function StoryForm({ onGenerateStory }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateStory(prompt);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Enter your story prompt..." 
      />
      <button type="submit">Generate Story</button>
    </form>
  );
}

export default StoryForm;
