import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import ParentLink from './ParentLink';

describe('ParentLink', () => {
  it('renders children and applies active class when matched', () => {
    const mockChildren = 'Parent Link';
    const mockTo = '/some-route';
    const mockMatch = true;

    const { getByText } = render(
      <MemoryRouter initialEntries={[mockTo]}>
        <ParentLink to={mockTo} isHovered={mockMatch}>
          {mockChildren}
        </ParentLink>
      </MemoryRouter>,
    );

    const linkElement = getByText(mockChildren);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('activeLink');
  });

  it('renders children ', () => {
    const mockChildren = 'Parent Link';
    const mockTo = '/some-route';
    const mockMatch = false;

    const { getByText } = render(
      <MemoryRouter initialEntries={['/other-route']}>
        <ParentLink to={mockTo} isHovered={mockMatch}>
          {mockChildren}
        </ParentLink>
      </MemoryRouter>,
    );

    const linkElement = getByText(mockChildren);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).not.toHaveClass('activeLink');
  });
});
