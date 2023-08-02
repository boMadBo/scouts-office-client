import { useToggleTheme } from '@/hooks/useToggleTheme';
import React from 'react';

const App = () => {
  const { isLightTheme, toggleThemeMode } = useToggleTheme();

  const handleButtonClick = () => {
    toggleThemeMode();
    console.log(isLightTheme);
  };
  return (
    <>
      <div>Hello</div>
      <button onClick={handleButtonClick}>Change Theme</button>
    </>
  );
};

export default App;
