import React from 'react';
import { render } from '@testing-library/react';
import CartPage from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../app/store';
test('CartPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </Provider>
  );
});
