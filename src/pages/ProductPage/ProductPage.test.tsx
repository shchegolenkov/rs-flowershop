import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ProductPage from './index';

import { store } from '@/app/store';

test('ProductPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>
    </Provider>
  );
});
