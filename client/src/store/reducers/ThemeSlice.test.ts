import { themeSlice } from './ThemeSlice';

describe('themeSlice', () => {
  it('should handle initial state', () => {
    const initialState = themeSlice.reducer(undefined, { type: 'unknown' });
    expect(initialState.isLight).toBe(true);
  });

  it('should handle toggleTheme', () => {
    const initialState = { isLight: true };
    const nextState = themeSlice.reducer(initialState, themeSlice.actions.toggleTheme());
    expect(nextState.isLight).toBe(false);
  });
});
