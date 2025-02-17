import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import configureStore from './store/store.js'
import * as sessionActions from "./store/session";
import { csrfFetch, restoreCSRF } from './store/csrf.js'
import { Provider } from 'react-redux'
import { Modal, ModalProvider } from './context/Modal.jsx'

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
)
