interface JWTUser {
  exp: number;
  iat: number;
  instructor: boolean;
  sub: string;
}

const decodeJWT = (token: string): JWTUser => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(decodedPayload);
};

export const getCurrentUser = () => {
  const storedJWT = localStorage.getItem('token');
  if (storedJWT) {
    return decodeJWT(storedJWT);
  }
  return undefined;
};

export const logout = () => {
  localStorage.clear();
};
