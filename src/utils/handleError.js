class ErrorHandle extends Error {
  constructor(code = "Generic", status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHandle);
    }

    this.code = code;
    this.status = status;
  }
}

module.exports = ErrorHandle;
