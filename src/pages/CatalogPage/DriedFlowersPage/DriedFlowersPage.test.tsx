import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import DriedFlowersPage from './index';

import { store } from '@/app/store';

test('DriedFlowersPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <DriedFlowersPage />
      </MemoryRouter>
    </Provider>
  );
});
