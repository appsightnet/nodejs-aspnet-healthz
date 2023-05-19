import { HealthReportEntry } from './HealthReportEntry'

export type UIHealthReportEntry = Omit<HealthReportEntry, 'exception'> & {
  exception?: string
}
