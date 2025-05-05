class ApiError extends Error {
  constructor(status = 500, message = "something went wrong") {
    super();
    this.status = status;
    this.message = message;
  }
}

export default ApiError;
