import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced error handling
const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error("Failed to render the app:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #333;">
        <h1>Application Error</h1>
        <p>Something went wrong while loading the application.</p>
        <p>Please try refreshing the page or contact support.</p>
      </div>
    `;
  }
} else {
  console.error("Failed to find the root element");
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; color: #333;">
      <h1>Configuration Error</h1>
      <p>Root element not found. Please check the HTML structure.</p>
    </div>
  `;
}