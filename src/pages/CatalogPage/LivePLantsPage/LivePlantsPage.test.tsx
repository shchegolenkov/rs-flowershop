import React from 'react';
import { render } from '@testing-library/react';
import LivePlantsPage from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../app/store';
test('LivePlantsPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LivePlantsPage />
      </MemoryRouter>
    </Provider>
  );
});
