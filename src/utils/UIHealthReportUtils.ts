import { HealthReport, UIHealthReport, UIHealthReportEntry } from '../schemas'
import { UIHealthReportEntryUtils } from './UIHealthReportEntryUtils'

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
    const entries: { [key: string]: UIHealthReportEntry } = {}

    for (const [key, value] of Object.entries(report.entries)) {
      entries[key] = UIHealthReportEntryUtils.fromHealthReportEntry(value)
    }

    return {
      status: report.status,
      totalDuration: report.totalDuration,
      entries,
    }
  }
}
