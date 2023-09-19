import React, { useState } from 'react';

function StoryForm({ onGenerateStory }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateStory(prompt);
  }

  return (
    <form className='prompt-bar' onSubmit={handleSubmit}>
      <input className='input-prompt'
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Enter your story prompt..." 
      />
      <button className='storygen' type="submit"><p className='genbtn'>Generate Story</p></button>
    </form>
  );
}

export default StoryForm;
