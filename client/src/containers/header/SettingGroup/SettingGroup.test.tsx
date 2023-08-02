import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import SettingGroup from './SettingGroup';

jest.mock('@/hooks/useToggleTheme', () => ({
  useToggleTheme: jest.fn(() => ({
    isLightTheme: true,
    toggleThemeMode: jest.fn(),
  })),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  }),
}));

describe('SettingGroup', () => {
  test('renders current theme correctly', () => {
    const { getByText } = render(<SettingGroup />);
    const currentThemeElement = getByText('Light');
    expect(currentThemeElement).toBeInTheDocument();
  });

  test('renders current language correctly', () => {
    const { getByText } = render(<SettingGroup />);
    const currentLangElement = getByText('En');
    expect(currentLangElement).toBeInTheDocument();
  });

  test('opens and closes language modal on mouse enter and leave', () => {
    const { getByText, queryByText } = render(<SettingGroup />);
    const langWrapper = getByText('En');
    fireEvent.mouseEnter(langWrapper);
    expect(queryByText('EN')).toBeInTheDocument();
    fireEvent.mouseLeave(langWrapper);
    expect(queryByText('EN')).not.toBeInTheDocument();
  });

  test('toggle language modal on click', () => {
    const { getByText, queryByText } = render(<SettingGroup />);
    const langWrapper = getByText('En');
    fireEvent.click(langWrapper);
    expect(queryByText('EN')).toBeInTheDocument();
    fireEvent.click(langWrapper);
    expect(queryByText('EN')).not.toBeInTheDocument();
  });
});
