import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Header from './';

describe('Header', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it('displays the logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const navigationLinks = ['Catalog', 'About us'];
    navigationLinks.forEach((linkText) => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
    });
  });
});
