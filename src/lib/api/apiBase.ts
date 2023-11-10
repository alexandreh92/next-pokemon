const HTTP_VERBS = {
  GET: "GET" as const,
  POST: "POST" as const,
  UPDATE: "UPDATE" as const,
  PUT: "PUT" as const,
  DELETE: "DELETE" as const,
};

type HTTPVerbKeys = keyof typeof HTTP_VERBS;
type HTTPVerb = (typeof HTTP_VERBS)[HTTPVerbKeys];

type APIMiddleware = (error: unknown) => Promise<void>;

export class BaseAPI {
  baseURL: string;
  headers: HeadersInit;
  exceptionMiddleware?: APIMiddleware;

  constructor() {
    this.baseURL = "";
    this.headers = { "Content-Type": "application/json" };
    this.exceptionMiddleware;
  }

  async get(path: string, config?: RequestInit) {
    return this.request(HTTP_VERBS.GET, path, config);
  }

  async request(method: HTTPVerb, path: string, config?: RequestInit) {
    const url = this.#urlForPath(path);

    const options = {
      ...config,
      method: method,
    } satisfies RequestInit;

    try {
      const response = await fetch(url, options);
      console.log("response");
      const data = await response.json();

      return data;
    } catch (error) {
      if (!this.exceptionMiddleware) throw error;

      await this.exceptionMiddleware(error);
    }
  }

  #urlForPath(path: string) {
    return `${this.baseURL}/${path}`;
  }
}
