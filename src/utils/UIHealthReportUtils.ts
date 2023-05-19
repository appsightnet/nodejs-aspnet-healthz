import { HealthReport, UIHealthReport } from '../schemas'
import { ErrorUtils } from './ErrorUtils'

/**
 * A utility for handling UIHealthReport.
 */
export class UIHealthReportUtils {
  /**
   * Converts from a HealthReport to an UIHealthReport.
   * @param report A HealthReport instance.
   * @returns A UIHealthReport instance.
   */
  static fromHealthReport(report: HealthReport): UIHealthReport {
    return {
      status: report.status,
      totalDuration: report.totalDuration,
      entries: Object.entries(report.entries).reduce((acc, [key, value]) => {
        if (key === 'exception' && value) {
          acc[key] = ErrorUtils.getErrorMessage(value)
        }
        return acc
      }, {}),
    }
  }
}
