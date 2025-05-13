import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import for React 18
import App from './App';
import './styles.css';

// Create a root element
const root = createRoot(document.getElementById('root'));

// Render the app using the new API
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);