import { HealthCheckContext } from './HealthCheckContext'
import { HealthCheckResult } from './HealthCheckResult'

export interface HealthCheck {
  checkHealthAsync(context: HealthCheckContext): Promise<HealthCheckResult>
}
