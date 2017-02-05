import React from 'react';

// Components
import LoginHeader from './LoginHeader';

const App = ({ children }) => {
  return (
    <div>
      <LoginHeader />
      {children}
    </div>
  );
};

export default App;
