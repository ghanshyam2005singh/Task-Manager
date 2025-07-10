const sendSuccessResponse = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    ...(data && { data })
  };
  
  return res.status(statusCode).json(response);
};

const sendErrorResponse = (res, message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors })
  };
  
  return res.status(statusCode).json(response);
};

const sendPaginatedResponse = (res, message, data, pagination, statusCode = 200) => {
  const response = {
    success: true,
    message,
    data,
    pagination
  };
  
  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  sendPaginatedResponse
};