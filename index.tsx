import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './src/App';

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
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);