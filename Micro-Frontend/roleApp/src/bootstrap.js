import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store as localStore } from './reducers/store';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={localStore}>
      <App />
    </Provider>
  </StrictMode>,
)
