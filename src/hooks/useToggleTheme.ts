import { toggleTheme } from '@/store/reducers/ThemeSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';

export const useToggleTheme = () => {
  const dispatch = useAppDispatch();
  const isLightTheme = useAppSelector((state) => state.theme.isLight);

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isLightTheme ? 'light' : 'dark');
    localStorage.setItem('app-theme', isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  return { isLightTheme, toggleThemeMode };
};
