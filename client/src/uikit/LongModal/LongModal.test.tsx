import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import LongModal from './LongModal';

describe('LongModal', () => {
  it('renders children', () => {
    const mockChildren = [<div key="child1">Child 1</div>, <div key="child2">Child 2</div>];

    const { getByText } = render(<LongModal>{mockChildren}</LongModal>);

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });
});
