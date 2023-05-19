import { HealthReport } from './HealthReport'
import { HealthCheckRegistration } from './HealthCheckRegistration'

/**
 * A service which can be used to check the status of HealthCheck instances registered in the application.
 */
export interface HealthCheckService {
  /**
   * Runs the provided health checks and returns the aggregated status.
   * @param predicate A predicate that can be used to include health checks based on user-defined criteria.
   * @param timeoutMilliseconds A milliseconds which can be used to cancel the health checks.
   * @return A HealthReport instance.
   */
  checkHealthAsync(
    predicate?: (registration: HealthCheckRegistration) => boolean,
    timeoutMilliseconds?: number
  ): Promise<HealthReport>
}
