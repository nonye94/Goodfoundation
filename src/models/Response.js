class Response {
  constructor(success, errorMessage, data){
    this.success = success;
    this.errorMessage = errorMessage;
    this.data = data;
  }
}


module.exports = Response;