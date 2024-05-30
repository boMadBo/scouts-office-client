import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import { useToggleTheme } from '@/common/hooks/useToggleTheme';
import { toggleTheme } from '@/store/reducers/ThemeSlice';
import { act, renderHook } from '@testing-library/react-hooks';

jest.mock('@/store/reducers/ThemeSlice', () => ({
  toggleTheme: jest.fn(),
}));

jest.mock('@/common/hooks/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe('useToggleTheme', () => {
  it('should toggle theme mode when toggleThemeMode is called', () => {
    const dispatch = jest.fn();
    const isLightTheme = true;

    (useAppSelector as jest.Mock).mockReturnValue(isLightTheme);
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    const { result } = renderHook(() => useToggleTheme());

    expect(result.current.isLightTheme).toEqual(isLightTheme);

    act(() => {
      result.current.toggleThemeMode();
    });

    expect(toggleTheme).toHaveBeenCalled();
  });
});
