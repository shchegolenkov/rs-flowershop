import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import CatalogCards from './index';

import { store } from '@/app/store';

test('CatalogCards renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CatalogCards />
      </MemoryRouter>
    </Provider>
  );
});
