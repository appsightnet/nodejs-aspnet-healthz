import { HealthReport } from './HealthReport'
import { HealthCheckRegistration } from './HealthCheckRegistration'

export interface HealthCheckService {
  checkHealthAsync(
    predicate?: (registration: HealthCheckRegistration) => boolean,
    timeoutMilliseconds?: number
  ): Promise<HealthReport>
}
