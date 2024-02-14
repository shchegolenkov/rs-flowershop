import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import SearchBar from './index';

import { store } from '@/app/store';

test('SearchBar renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    </Provider>
  );
});
