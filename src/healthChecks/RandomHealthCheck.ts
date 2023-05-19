import {
  HealthCheck,
  HealthCheckContext,
  HealthCheckResult,
  HealthStatus,
} from '../schemas'
import { Constants, RandomUtils } from '../utils'

export class RandomHealthCheck implements HealthCheck {
  async checkHealthAsync(
    context: HealthCheckContext
  ): Promise<HealthCheckResult> {
    return {
      status: RandomUtils.choice<HealthStatus>(
        Array.from(Constants.healthStatuses)
      ),
    }
  }
}
