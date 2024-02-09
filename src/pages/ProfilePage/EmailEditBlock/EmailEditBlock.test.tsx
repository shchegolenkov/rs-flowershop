import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../../../app/store';

import EmailForm from './index';

test('renders EmailForm without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <EmailForm />
      </MemoryRouter>
    </Provider>
  );
});
