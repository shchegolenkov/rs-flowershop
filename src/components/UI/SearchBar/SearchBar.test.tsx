import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../../../app/store';

import SearchBar from './index';
test('SearchBar renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    </Provider>
  );
});
