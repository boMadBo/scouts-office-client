import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';

import ShortModal from './ShortModal';

describe('ShortModal', () => {
  test('renders children', () => {
    const mockChildren = [<div key="child1">Child 1</div>, <div key="child2">Child 2</div>];

    const { getByText } = render(<ShortModal>{mockChildren}</ShortModal>);

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });
});
