import { HealthReportEntry } from './HealthReportEntry'
import { HealthStatus } from './HealthStatus'

export type HealthReport = {
  status: HealthStatus
  totalDuration: string
  entries: { [key: string]: HealthReportEntry }
}
