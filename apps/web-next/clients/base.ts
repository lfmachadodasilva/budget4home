export abstract class BaseClient {
  protected static async fetch<T>(
    url: string,
    token: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
  ): Promise<Response> {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify(data)
    });
    return response;
  }
}
