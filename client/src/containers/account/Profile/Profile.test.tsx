import { setupStore } from '@/store/store';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Profile from './Profile';

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

const mockTo = '/some-route';
const store = setupStore();

describe('Profile', () => {
  test('renders profile with data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[mockTo]}>
          <Profile />
        </MemoryRouter>
      </Provider>
    );

    const profileText = screen.getByText('My profile');
    const editProfileLink = screen.getByText('edit profile');

    expect(profileText).toBeInTheDocument();
    expect(editProfileLink).toBeInTheDocument();
  });
});
