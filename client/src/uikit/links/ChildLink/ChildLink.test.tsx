import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ChildLink from './ChildLink';

describe('ChildLink', () => {
  it('renders children link correctly', () => {
    const mockChildren = 'Child Link';
    const mockTo = '/child';

    const { getByText } = render(
      <MemoryRouter>
        <ChildLink to={mockTo} onClick={() => {}}>
          {mockChildren}
        </ChildLink>
      </MemoryRouter>
    );

    const linkElement = getByText(mockChildren);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', mockTo);
  });
});
