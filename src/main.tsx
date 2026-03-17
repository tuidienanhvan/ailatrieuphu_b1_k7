import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

declare global {
  interface Window {
    MathJax: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>;
      tex: any;
      startup: any;
    };
    webkitAudioContext: typeof AudioContext;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
