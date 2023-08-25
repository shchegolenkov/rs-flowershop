import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './';

describe('Button', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('applies default primary variant', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveClass('primary');
  });

  it('applies secondary variant', () => {
    const { getByText } = render(<Button variant="secondary">Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveClass('secondary');
  });

  it('applies full class', () => {
    const { getByText } = render(<Button full>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveClass('full');
  });

  it('is disabled when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders with additional className', () => {
    const { getByText } = render(<Button className="custom-class">Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveClass('custom-class');
  });

  it('renders with custom type attribute', () => {
    const { getByText } = render(<Button type="submit">Submit</Button>);
    const button = getByText('Submit');
    expect(button.getAttribute('type')).toBe('submit');
  });
});
