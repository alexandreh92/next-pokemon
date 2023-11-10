type APIMiddleware = (
  error: unknown,
  { url, options }: { url: string; options: RequestInit }
) => Promise<void>;

type BaseAPIError = {
  name: string;
  message: string;
};
