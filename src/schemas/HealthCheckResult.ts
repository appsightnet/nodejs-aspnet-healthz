import { HealthStatus } from './HealthStatus'

export type HealthCheckResult = {
  data?: { [key: string]: any }
  description?: string
  exception?: unknown
  status: HealthStatus
}
