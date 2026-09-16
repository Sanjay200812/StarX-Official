import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles/index.css';

// 1. Disable automatic browser scroll restoration at startup (Requirement 1)
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// 2. Force scroll position to top before initial render (Requirement 3)
if (typeof window !== 'undefined') {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
