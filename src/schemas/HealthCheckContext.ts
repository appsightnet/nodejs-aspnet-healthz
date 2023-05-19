import { HealthCheckRegistration } from './HealthCheckRegistration'

export type HealthCheckContext = {
  /**
   *  The HealthCheckRegistration of the currently executing HealthCheck.
   */
  registration: HealthCheckRegistration
}
