import { Constants } from '../utils'

/**
 * Represents the reported status of a health check result.
 */
export type HealthStatus = (typeof Constants.healthStatuses)[number]
