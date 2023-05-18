import { Constants } from './constants'
import {
  HealthCheckRegistration,
  HealthCheckService,
  HealthCheckServiceOptions,
  HealthReport,
  HealthReportEntry,
} from './schemas'
import { parseErrorMessage, withTimeout } from './utils'
import { DurationConverter } from './converters'

export class DefaultHealthCheckService implements HealthCheckService {
  private _options: HealthCheckServiceOptions

  constructor(options: HealthCheckServiceOptions) {
    this._options = options
  }

  async checkHealthAsync(
    predicate?: (registration: HealthCheckRegistration) => boolean,
    timeoutMilliseconds?: number
  ): Promise<HealthReport> {
    return timeoutMilliseconds
      ? await withTimeout(this.runChecksAsync(predicate), timeoutMilliseconds)
      : await this.runChecksAsync(predicate)
  }

  private async runChecksAsync(
    predicate?: (registration: HealthCheckRegistration) => boolean
  ): Promise<HealthReport> {
    const entries: Record<string, HealthReportEntry> = {}
    const startTime = Date.now()

    for (const registration of Object.values(this._options.registrations)) {
      if (!predicate || predicate(registration)) {
        const entry = await this.runCheckAsync(registration)
        entries[registration.name] = entry
      }
    }

    const minStatusIndex = Object.values(entries)
      .map((x) => Constants.healthStatuses.indexOf(x.status))
      .reduce((a, b) => Math.min(a, b))
    const stopTime = Date.now()
    const totalDurationMs = stopTime - startTime

    return {
      status: Constants.healthStatuses[minStatusIndex],
      totalDuration: DurationConverter.fromMilliseconds(totalDurationMs),
      entries,
    }
  }

  private async runCheckAsync(
    registration: HealthCheckRegistration
  ): Promise<HealthReportEntry> {
    const startTime = Date.now()
    const context = { registration }

    try {
      const result = registration.timeoutMilliseconds
        ? await withTimeout(
            registration.instance.checkHealthAsync(context),
            registration.timeoutMilliseconds
          )
        : await registration.instance.checkHealthAsync(context)
      const stopTime = Date.now()
      const durationMs = stopTime - startTime

      return {
        status: result.status,
        description: result.description,
        duration: DurationConverter.fromMilliseconds(durationMs),
        exception: result.exception,
        data: result.data,
        tags: registration.tags,
      }
    } catch (error) {
      const stopTime = Date.now()
      const durationMs = stopTime - startTime
      return {
        status: registration.failureStatus ?? 'Unhealthy',
        description: parseErrorMessage(error),
        duration: DurationConverter.fromMilliseconds(durationMs),
        exception: error,
        tags: registration.tags,
      }
    }
  }
}
