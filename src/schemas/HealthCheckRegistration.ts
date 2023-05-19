import { HealthCheck } from './HealthCheck'
import { HealthStatus } from './HealthStatus'

export type HealthCheckRegistration = {
  name: string
  tags: string[]
  instance: HealthCheck
  failureStatus?: HealthStatus
  timeoutMilliseconds?: number
}
