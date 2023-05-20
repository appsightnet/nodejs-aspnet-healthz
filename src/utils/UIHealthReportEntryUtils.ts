import { HealthReportEntry, UIHealthReportEntry } from '../schemas'
import { ErrorUtils } from './ErrorUtils'

/**
 * A utility for handling UIHealthReportEntry.
 */
export class UIHealthReportEntryUtils {
  /**
   * Converts from a HealthReportEntry to an UIHealthReportEntry.
   * @param report A HealthReportEntry instance.
   * @returns A UIHealthReportEntry instance.
   */
  static fromHealthReportEntry(entry: HealthReportEntry): UIHealthReportEntry {
    const { exception, ...rest } = entry
    const convertedEntry: UIHealthReportEntry = {
      ...rest,
      exception: exception ? ErrorUtils.getErrorMessage(exception) : undefined,
    }
    return convertedEntry
  }
}
