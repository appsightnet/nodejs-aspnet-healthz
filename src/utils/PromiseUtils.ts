export class PromiseUtils {
  static async withTimeout<T>(promise: Promise<T>, milliseconds: number) {
    const errorMessage = `Timeout of ${milliseconds} ms exceeded.`

    const timeoutPromise: Promise<T> = new Promise((_, reject) =>
      setTimeout(() => reject(errorMessage), milliseconds)
    )
    return Promise.race([promise, timeoutPromise])
  }
}
