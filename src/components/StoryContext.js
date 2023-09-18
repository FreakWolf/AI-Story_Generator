// Create a new file named `StoryContext.js` in your project
import React, { createContext, useState } from 'react';

const StoryContext = createContext();

const StoryProvider = ({ children }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  return (
    <StoryContext.Provider value={{ leaderboardData, setLeaderboardData }}>
      {children}
    </StoryContext.Provider>
  );
};

export { StoryContext, StoryProvider };
