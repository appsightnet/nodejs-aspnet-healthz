import { HealthStatus } from './HealthStatus'

/**
 * Represents the result of a health check.
 */
export type HealthCheckResult = {
  /**
   * Additional key-value pairs describing the health of the component.
   */
  data?: { [key: string]: any }

  /**
   * A human-readable description of the status of the component that was checked.
   */
  description?: string

  /**
   * An Exception(JS Error) representing the exception that was thrown when checking for status (if any).
   */
  exception?: unknown

  /**
   * A value indicating the status of the component that was checked.
   */
  status: HealthStatus
}
