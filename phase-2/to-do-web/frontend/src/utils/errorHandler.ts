// frontend/src/utils/errorHandler.ts
export class ApiError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  // Network error
  if (!error.status) {
    return new ApiError('Network error. Please check your connection.', 0);
  }

  // HTTP error
  return new ApiError(
    error.message || `HTTP Error: ${error.status}`,
    error.status || 500,
    error
  );
};

export const getErrorMessage = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return error?.message || 'An unexpected error occurred';
};