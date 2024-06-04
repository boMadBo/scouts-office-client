export const saveLoginTokens = (response: any) => {
  const hasData = 'data' in response;

  if (hasData) {
    const token = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (token) {
      window.dispatchEvent(new CustomEvent('tokenRefreshed', { detail: token }));
      localStorage.setItem('token', token);
    }
  }
};
