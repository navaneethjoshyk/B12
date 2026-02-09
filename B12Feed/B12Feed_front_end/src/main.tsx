import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'; // ADDED
import { store } from './store'; // ADDED (Ensure this points to your store file)
import './index.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap App with Provider and pass in your store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)