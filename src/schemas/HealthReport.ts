import { HealthReportEntry } from './HealthReportEntry'
import { HealthStatus } from './HealthStatus'

/**
 * Represents the result of executing a group of IHealthCheck instances.
 */
export type HealthReport = {
  /**
   * A record containing the results from each health check.
   */
  entries: { [key: string]: HealthReportEntry }

  /**
   *  A HealthStatus representing the aggregate status of all the health checks. The value of Status will be the most servere status reported by a health check. If no checks were executed, the value is always Healthy.
   */
  status: HealthStatus

  /**
   * The time the health check service took to execute.
   */
  totalDuration: string
}
