import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter , Routes , Route} from 'react-router-dom';

import { store } from './app/store.jsx'
import { Provider } from 'react-redux';
import { fetchUsers } from './features/user/userSlice.jsx'

store.dispatch(fetchUsers());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App></App>}></Route>
          </Routes>
        </BrowserRouter>
    </Provider>
  </StrictMode>,
)
