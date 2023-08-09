import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Timezones from './Timezones';

describe('Timezones', () => {
  test('renders without errors', () => {
    render(<Timezones />);
  });

  test('toggles settings on click', () => {
    const { getByTestId } = render(<Timezones />);
    const settingsIcon = getByTestId('settings-icon');
    fireEvent.click(settingsIcon);

    const addingButton = getByTestId('adding-button');
    expect(addingButton).toBeInTheDocument();
  });
});
