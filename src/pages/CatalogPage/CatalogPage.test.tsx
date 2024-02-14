import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import CatalogPage from './index';

import { store } from '@/app/store';

test('CatalogPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    </Provider>
  );
});
