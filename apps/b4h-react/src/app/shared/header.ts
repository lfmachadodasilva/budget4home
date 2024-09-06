export const getHeaders = (token: string, body?: any): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  if (body) {
    headers.body = JSON.stringify(body);
  }

  return headers;
};
