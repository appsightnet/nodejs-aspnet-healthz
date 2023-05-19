import {
  HealthCheck,
  HealthCheckContext,
  HealthCheckResult,
  HealthStatus,
} from '@/schemas'

export class StubHealthCheck implements HealthCheck {
  private _status: HealthStatus

  constructor(status: HealthStatus = 'Healthy') {
    this._status = status
  }

  async checkHealthAsync(
    context: HealthCheckContext
  ): Promise<HealthCheckResult> {
    return {
      status: this._status,
      description: `${context.registration.name} is ${this._status}!`,
    }
  }
}
