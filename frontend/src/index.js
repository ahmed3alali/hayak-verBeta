// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main App component
import './i18n.js'; // Your internationalization setup (if needed)
import { Provider } from 'react-redux'; // Redux provider
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate to handle persistence
import { store, persistor } from './Redux/store'; // Import the store and persistor from the store file

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element for React
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the Redux store to the app */}
      <PersistGate loading={null} persistor={persistor}> {/* PersistGate will manage the persistence */}
        <App /> {/* Your main app */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
