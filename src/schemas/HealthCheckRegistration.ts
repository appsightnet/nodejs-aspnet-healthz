import { HealthCheck } from './HealthCheck'
import { HealthStatus } from './HealthStatus'

/**
 * Represent the registration information associated with an HealthCheck implementation.
 */
export type HealthCheckRegistration = {
  /**
   * The HealthStatus that should be reported upon failure of the health check.
   */
  failureStatus?: HealthStatus

  /**
   * A HealthCheck instance.
   */
  instance: HealthCheck

  /**
   * The health check name.
   */
  name: string

  /**
   * A list of tags that can be used for filtering health checks.
   */
  tags: string[]

  /**
   * The timeout used for the test.
   */
  timeoutMilliseconds?: number
}
