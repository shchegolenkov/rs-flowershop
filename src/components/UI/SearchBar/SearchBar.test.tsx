import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../app/store';
test('SearchBar renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    </Provider>
  );
});
