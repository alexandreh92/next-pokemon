import { ApiException } from "./apiException";

export class NotAuthorizedException extends ApiException {
  constructor(message: string, response: Response) {
    super(message, response);

    this.name = "NotAuthorizedException";
    this.friendlyMessage = "You are not authorized to do perform this action.";
  }
}
