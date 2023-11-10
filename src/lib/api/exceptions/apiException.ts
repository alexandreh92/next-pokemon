export class ApiException extends Error {
  response: Response;
  friendlyMessage: string;

  constructor(message: string, response: Response) {
    super(message);

    this.response = response;
    this.friendlyMessage = "Some error occurred.";
  }

  suppressErrorReport() {
    false;
  }
}
