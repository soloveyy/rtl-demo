import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './components/auth'
import App from './App';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth/>} />
            <Route path="/movies" element={<App/>} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
