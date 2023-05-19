import { HealthCheck, HealthCheckContext, HealthCheckResult } from '@/schemas'

export class HealthyHealthCheck implements HealthCheck {
  async checkHealthAsync(
    context: HealthCheckContext
  ): Promise<HealthCheckResult> {
    return {
      status: 'Healthy',
    }
  }
}
