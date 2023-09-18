import React from 'react';
import { render } from '@testing-library/react';
import SortingBlock from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../app/store';
test('SortingBlock renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SortingBlock />
      </MemoryRouter>
    </Provider>
  );
});
