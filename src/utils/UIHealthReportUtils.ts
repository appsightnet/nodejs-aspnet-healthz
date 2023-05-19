import { HealthReport, UIHealthReport } from '../schemas'
import { ErrorUtils } from './ErrorUtils'

export class UIHealthReportUtils {
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
