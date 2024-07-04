import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import MainPage from './components/mainPage/mainPage';
import ProductsList from './components/productsList/productsList';
import Product from './components/product/product';

function App() {
  return (
      <>
          <GlobalStyle />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/products-list" element={<ProductsList />} />
              <Route path="/:id" element={<Product />} />
          </Routes>
      </>
  );
}

const GlobalStyle = createGlobalStyle`
    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        /* Другие глобальные стили */
    }
`;

export default App;

