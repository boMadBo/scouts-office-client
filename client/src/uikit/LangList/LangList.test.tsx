import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import LangList from './LangList';

describe('LangList', () => {
  it('renders text changeLanguage on click', () => {
    const mockText = 'English';
    const mockChangeLanguage = jest.fn();
    const mockLang = 'en';

    const { getByText } = render(<LangList text={mockText} changeLanguage={mockChangeLanguage} lang={mockLang} />);

    const langElement = getByText(mockText);
    fireEvent.click(langElement);

    expect(mockChangeLanguage).toHaveBeenCalledWith(mockLang);
  });
});
