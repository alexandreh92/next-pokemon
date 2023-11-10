import { ApiException } from "./apiException";

export class NotFoundException extends ApiException {
  constructor(message: string, response: Response) {
    super(message, response);

    this.name = "NotFoundException";
    this.friendlyMessage = "The requested endpoint was not found.";
  }
}
