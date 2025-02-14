import { Response } from "express";
import HttpStatusCode from "./HttpStatusCode";

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse<T> {
  success: false;
  error: {
    message: T;
  };
}

// Success response with data
export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  status = HttpStatusCode.OK
): Response<SuccessResponse<T>> => {
  return res.status(status).json({ success: true, data });
};

// Success response without data (e.g., for delete operations)
export const sendSuccessNoDataResponse = (
  res: Response,
  message = "Operation successful",
  status = HttpStatusCode.OK
): Response<SuccessResponse<null>> => {
  return res.status(status).json({ success: true, message });
};

// Error response
export const sendErrorResponse = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.INTERNAL_SERVER_ERROR
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Not Found response
export const sendNotFoundResponse = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.NOT_FOUND
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Validation Error response
// export const sendValidationError = <T>(
//   res: Response,
//   message: T,
//   errors: string[],
//   status = HttpStatusCode.BAD_REQUEST
// ): Response<ErrorResponse<T>> => {
//   return res.status(status).json({
//     success: false,
//     error: {
//       message: message,
//       errors: errors,
//     },
//   });
// };
export const sendValidationError = <T>(
  res: Response,
  message: T,
  errors: { path: string; message: string }[], // Array of objects with path and message
  status = HttpStatusCode.BAD_REQUEST
): Response => {
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      errors: errors, // Return errors as an array of objects
    },
  });
};

// Unauthorized response
export const sendUnauthorizedResponse = <T>(
  res: Response,
  message = "Unauthorized",
  status = HttpStatusCode.UNAUTHORIZED
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Forbidden response
export const sendForbiddenResponse = <T>(
  res: Response,
  message = "Forbidden",
  status = HttpStatusCode.FORBIDDEN
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Bad Request response
export const sendBadRequestResponse = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.BAD_REQUEST
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};
