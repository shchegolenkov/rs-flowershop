import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import AboutPage from './index';

import { store } from '@/app/store';

test('AboutPage renders without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    </Provider>
  );
});
