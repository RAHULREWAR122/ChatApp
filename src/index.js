import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './Context1/AuthContext';
import { ChatContextProvider } from './Context1/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
           <App />
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
