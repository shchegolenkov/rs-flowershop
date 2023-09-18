import React from 'react';
import { render } from '@testing-library/react';
import Filters from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../app/store';
test('Filters renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Filters />
      </MemoryRouter>
    </Provider>
  );
});
