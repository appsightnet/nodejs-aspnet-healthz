import { HealthStatus } from './HealthStatus'

export type HealthReportEntry = {
  data?: { [key: string]: any }
  description?: string
  duration: string
  exception?: unknown
  status: HealthStatus
  tags?: string[]
}
