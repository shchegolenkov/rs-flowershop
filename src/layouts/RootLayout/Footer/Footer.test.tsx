import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';
import Footer from './';

describe('Footer', () => {
  it('renders footer links correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(7);

    const linkTexts = [
      'All products',
      'Fresh Flowers',
      'Dried Flowers',
      'Live Plants',
      'Aroma Candles',
      'Freshener Diffuser',
      'About us',
    ];
    linkTexts.forEach((linkText) => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });
});
