import {
  HealthCheckService,
  HealthCheckServiceOptions,
  HealthCheckRegistration,
  HealthReport,
  HealthReportEntry,
} from '../schemas'
import {
  DurationUtils,
  ErrorUtils,
  HealthReportUtils,
  PromiseUtils,
} from '../utils'

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
      ? await PromiseUtils.withTimeout(
          this.runChecksAsync(predicate),
          timeoutMilliseconds
        )
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

    const status = HealthReportUtils.getMinStatusByEntries(entries)
    const stopTime = Date.now()
    const totalDurationMs = stopTime - startTime

    return {
      status,
      totalDuration: DurationUtils.fromMilliseconds(totalDurationMs),
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
        ? await PromiseUtils.withTimeout(
            registration.instance.checkHealthAsync(context),
            registration.timeoutMilliseconds
          )
        : await registration.instance.checkHealthAsync(context)
      const stopTime = Date.now()
      const durationMs = stopTime - startTime

      return {
        status: result.status,
        description: result.description,
        duration: DurationUtils.fromMilliseconds(durationMs),
        exception: result.exception,
        data: result.data,
        tags: registration.tags,
      }
    } catch (error) {
      const stopTime = Date.now()
      const durationMs = stopTime - startTime
      return {
        status: registration.failureStatus ?? 'Unhealthy',
        description: ErrorUtils.getErrorMessage(error),
        duration: DurationUtils.fromMilliseconds(durationMs),
        exception: error,
        tags: registration.tags,
      }
    }
  }
}
