import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import EmailForm from './index';
import { MemoryRouter } from 'react-router-dom';

test('renders EmailForm without errors', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <EmailForm />
      </MemoryRouter>
    </Provider>
  );
});
