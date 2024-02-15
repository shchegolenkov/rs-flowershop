import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import CatalogPagination from './index';

import { store } from '@/app/store';

test('CatalogPagination renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CatalogPagination />
      </MemoryRouter>
    </Provider>
  );
});
