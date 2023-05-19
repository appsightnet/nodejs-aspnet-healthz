import { HealthReportEntry, HealthStatus } from '@/schemas'
import { Constants } from './Constants'

export class HealthReportUtils {
  static getMinStatusByEntries(
    entries: Record<string, HealthReportEntry>
  ): HealthStatus {
    const minIndex = Object.values(entries)
      .map((x) => Constants.healthStatuses.indexOf(x.status))
      .reduce((a, b) => Math.min(a, b), Infinity)
    return Constants.healthStatuses[minIndex]
  }
}
