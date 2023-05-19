import { HealthStatus } from './HealthStatus'

/**
 * Represents an entry in a HealthReport. Corresponds to the result of a single HealthCheck.
 */
export type HealthReportEntry = {
  /**
   * Additional key-value pairs describing the health of the component.
   */
  data?: { [key: string]: any }

  /**
   * A human-readable description of the status of the component that was checked.
   */
  description?: string

  /**
   * The health check execution duration.
   */
  duration: string

  /**
   * An Exception(JS Error) representing the exception that was thrown when checking for status (if any).
   */
  exception?: unknown

  /**
   * The health status of the component that was checked.
   */
  status: HealthStatus

  /**
   * The tags associated with the health check.
   */
  tags?: string[]
}
