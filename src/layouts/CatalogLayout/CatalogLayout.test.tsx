import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import CatalogLayout from './index';

import { store } from '@/app/store';

test('CatalogLayout renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CatalogLayout />
      </MemoryRouter>
    </Provider>
  );
});
