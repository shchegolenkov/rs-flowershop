import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import MainPage from './index';

import { store } from '@/app/store';

test('MainPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    </Provider>
  );
});
