// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getError = (error: any) => {
  return error.message &&error.response.data.message ? error.response.data.message : error.message
}