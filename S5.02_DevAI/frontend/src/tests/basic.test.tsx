import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

// Simple component test
const TestComponent: React.FC = () => {
  return <div>Hello World</div>;
};

describe('Basic Tests', () => {
  test('renders hello world', () => {
    render(<TestComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('basic math operations', () => {
    expect(2 + 2).toBe(4);
    expect(5 * 3).toBe(15);
  });

  test('string operations', () => {
    const str = 'Hello World';
    expect(str).toContain('World');
    expect(str.length).toBe(11);
  });
});