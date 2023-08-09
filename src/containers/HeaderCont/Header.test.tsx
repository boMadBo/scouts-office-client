import { setupStore } from '@/store/store';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  }),
}));

jest.mock('react-router-dom', () => {
  const actualModule = jest.requireActual('react-router-dom');
  return {
    ...actualModule,
    useMatch: jest.fn(() => false),
  };
});

describe('Header', () => {
  test('renders navigation links', () => {
    const mockTo = '/some-route';
    const store = setupStore();
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[mockTo]}>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const navigationLinks = ['Account', 'Leagues', 'News', 'Videos'];
    navigationLinks.forEach((linkText) => {
      const navigationLink = getByText(linkText);
      expect(navigationLink).toBeInTheDocument();
    });
  });

  test('opens and closes submenu on mouse hover and leave', () => {
    const store = setupStore();
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/other-route']}>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const leaguesLink = getByText('Leagues');
    fireEvent.mouseEnter(leaguesLink);
    const submenuLinks = ['All leagues', 'England'];
    submenuLinks.forEach((linkText) => {
      const submenuLink = queryByText(linkText);
      expect(submenuLink).toBeInTheDocument();
    });

    fireEvent.mouseLeave(leaguesLink);
    submenuLinks.forEach((linkText) => {
      const submenuLink = queryByText(linkText);
      expect(submenuLink).toBeNull();
    });
  });
});
