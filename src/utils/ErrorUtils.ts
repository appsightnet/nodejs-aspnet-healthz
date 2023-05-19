export class ErrorUtils {
  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    } else if (typeof error === 'string') {
      return error
    } else {
      return '' + error
    }
  }
}
