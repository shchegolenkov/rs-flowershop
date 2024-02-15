import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import RootLayout from './index';

import { store } from '@/app/store';

test('RootLayout renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    </Provider>
  );
});
