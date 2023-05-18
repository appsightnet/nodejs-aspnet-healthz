import { Constants } from './constants'

export type HealthReport = {
  status: HealthStatus
  totalDuration: string
  entries: { [key: string]: HealthReportEntry }
}

export type HealthStatus = (typeof Constants.healthStatuses)[number]

export type HealthCheckContext = {
  registration: HealthCheckRegistration
}

export type HealthCheckServiceOptions = {
  registrations: HealthCheckRegistration[]
}

export type HealthReportEntry = {
  data?: { [key: string]: any }
  description?: string
  duration: string
  exception?: unknown
  status: HealthStatus
  tags?: string[]
}

export type HealthCheckResult = {
  data?: { [key: string]: any }
  description?: string
  exception?: unknown
  status: HealthStatus
}

export type HealthCheckRegistration = {
  name: string
  tags: string[]
  instance: HealthCheck
  failureStatus?: HealthStatus
  timeoutMilliseconds?: number
}

export type HealthCheck = {
  checkHealthAsync(context: HealthCheckContext): Promise<HealthCheckResult>
}

export type HealthCheckService = {
  checkHealthAsync(
    predicate?: (registration: HealthCheckRegistration) => boolean,
    timeoutMilliseconds?: number
  ): Promise<HealthReport>
}

export type UIHealthReport = Omit<HealthReport, 'entries'> & {
  entries: { [key: string]: UIHealthReportEntry }
}

export type UIHealthReportEntry = Omit<HealthReportEntry, 'exception'> & {
  exception?: string
}
