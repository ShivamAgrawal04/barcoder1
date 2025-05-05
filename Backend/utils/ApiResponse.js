class ApiResponse {
  constructor(status = 500, message = "something went wrong", data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
