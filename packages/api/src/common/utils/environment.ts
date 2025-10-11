export const getEnvironment = () => {
  return process.env.NODE_ENV || 'local';
};

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isLocal = process.env.NODE_ENV === 'local';
