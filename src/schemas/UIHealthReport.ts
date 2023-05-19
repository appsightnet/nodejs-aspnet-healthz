import { UIHealthReportEntry } from './UIHealthReportEntry'
import { HealthReport } from './HealthReport'

export type UIHealthReport = Omit<HealthReport, 'entries'> & {
  entries: { [key: string]: UIHealthReportEntry }
}
