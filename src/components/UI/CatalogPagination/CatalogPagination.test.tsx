import React from 'react';
import { render } from '@testing-library/react';
import CatalogPagination from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../app/store';
test('CatalogPagination renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CatalogPagination />
      </MemoryRouter>
    </Provider>
  );
});
