export const withTimeout = <T>(promise: Promise<T>, milliseconds: number) => {
  const errorMessage = `Timeout of ${milliseconds} ms exceeded.`

  const timeoutPromise: Promise<T> = new Promise((_, reject) =>
    setTimeout(() => reject(errorMessage), milliseconds)
  )
  return Promise.race([promise, timeoutPromise])
}

export const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    return '' + error
  }
}
