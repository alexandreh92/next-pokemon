export const exceptionMiddleware = async (error) => {
  // notify sentry or bugsnag based on the error config
  console.log(error.message);
  // notify with a toast message maybe?
};
