import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { WishlistProvider } from './hooks/useWishlist';

ReactDOM.render(
  <WishlistProvider>
    <App />
  </WishlistProvider>,
  document.getElementById('root')
);