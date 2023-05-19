import { HealthCheckRegistration } from './HealthCheckRegistration'

/**
 * Options for the default implementation of HealthCheckService.
 */
export type HealthCheckServiceOptions = {
  /**
   * The health check registrations.
   */
  registrations: HealthCheckRegistration[]
}
