import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Header from './';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

describe('Header', () => {
  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
  });

  it('displays the logo', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const navigationLinks = ['Catalog', 'About us'];
    navigationLinks.forEach((linkText) => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
    });
  });
});
