// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getError = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return 'An unknown error occurred';
  }
}