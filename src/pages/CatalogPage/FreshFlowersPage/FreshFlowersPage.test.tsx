import React from 'react';
import { render } from '@testing-library/react';
import FreshFlowersPage from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../app/store';
test('FreshFlowersPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <FreshFlowersPage />
      </MemoryRouter>
    </Provider>
  );
});
