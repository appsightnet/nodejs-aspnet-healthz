import { HealthCheckContext } from './HealthCheckContext'
import { HealthCheckResult } from './HealthCheckResult'

/**
 * Represents a health check, which can be used to check the status of a component in the application, such as a backend service, database or some internal state.
 */
export interface HealthCheck {
  /**
   * Runs the health check, returning the status of the component being checked.
   * @param context
   */
  checkHealthAsync(context: HealthCheckContext): Promise<HealthCheckResult>
}
