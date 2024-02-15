import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import EmailForm from './index';

import { store } from '@/app/store';

test('renders EmailForm without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <EmailForm />
      </MemoryRouter>
    </Provider>
  );
});
