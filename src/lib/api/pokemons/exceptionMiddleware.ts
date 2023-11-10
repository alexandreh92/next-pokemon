import { ApiException } from "../exceptions/apiException";
import { NotAuthorizedException } from "../exceptions/notAuthorizedException";
import { NotFoundException } from "../exceptions/notFoundException";

type RequestOptions = {
  url: string;
  options: RequestInit;
};

const API_EXCEPTIONS = {
  401: NotAuthorizedException,
  404: NotFoundException,
};

export const exceptionMiddleware = async (
  options,
  response: Response,
  errors
) => {
  if (response.ok) return errors;

  const exceptionClass = API_EXCEPTIONS[response.status] || ApiException;
  const responseBody = await response.json();

  const exception = new exceptionClass(
    `Exception response-status=${response.status} ` +
      `${options.method} ${response.url} ` +
      `response-body=${JSON.stringify(responseBody)} headers=${JSON.stringify(
        Object.fromEntries(response.headers.entries())
      )}`,
    response
  );

  console.log(exception);

  const newErrors = [
    ...errors,
    { name: exception.name, message: exception.friendlyMessage },
  ];

  return newErrors;
};
