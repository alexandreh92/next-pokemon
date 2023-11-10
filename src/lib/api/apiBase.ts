const HTTP_VERBS = {
  GET: "GET" as const,
  POST: "POST" as const,
  UPDATE: "UPDATE" as const,
  PUT: "PUT" as const,
  DELETE: "DELETE" as const,
};

type HTTPVerbKeys = keyof typeof HTTP_VERBS;
type HTTPVerb = (typeof HTTP_VERBS)[HTTPVerbKeys];

export class BaseAPI {
  baseURL: string;
  requestMiddlewares: any[];
  responseMiddlewares: any[];

  constructor() {
    this.baseURL = "";
    this.requestMiddlewares = [];
    this.responseMiddlewares = [];
  }

  async get<T>(path: string, config?: RequestInit) {
    return this.request<T>(HTTP_VERBS.GET, path, config);
  }

  async request<T>(method: HTTPVerb, path: string, config?: RequestInit) {
    const url = this.#urlForPath(path);

    const options = {
      ...config,
      headers: { "Content-Type": "application/json" },
      method: method,
    } satisfies RequestInit;

    try {
      for (const middleware of this.requestMiddlewares) {
        await middleware(options);
      }

      const response = await fetch(url, options);

      //remove this because next has the error.tsx which handles the error.
      let errors: BaseAPIError[] = [];

      for (const middleware of this.responseMiddlewares) {
        errors = await middleware(options, response, errors);
      }

      let data: T | undefined = undefined;
      if (response.ok) {
        data = await response.json();
      }

      return { data, errors };
    } catch (error: any) {
      return {
        errors: [
          { name: error.name, message: error.message },
        ] as BaseAPIError[],
      };
    }
  }

  #urlForPath(path: string) {
    return `${this.baseURL}/${path}`;
  }
}
