import React from 'react';
import { render } from '@testing-library/react';
import FreshenersPage from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../app/store';
test('FreshenersPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <FreshenersPage />
      </MemoryRouter>
    </Provider>
  );
});
