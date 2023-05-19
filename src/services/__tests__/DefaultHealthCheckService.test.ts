import { StubHealthCheck } from '@/healthChecks'
import { DefaultHealthCheckService } from '../DefaultHealthCheckService'
import { HealthCheckServiceOptions } from '@/schemas'

describe('DefaultHealthCheckService', () => {
  const defaultOptions: HealthCheckServiceOptions = {
    registrations: [
      {
        name: 'healthy-1',
        instance: new StubHealthCheck('Healthy'),
        tags: ['liveness', 'readiness'],
      },
      {
        name: 'healthy-2',
        instance: new StubHealthCheck('Healthy'),
        tags: ['liveness'],
      },
      {
        name: 'healthy-3',
        instance: new StubHealthCheck('Healthy'),
        tags: ['readiness'],
      },
    ],
  }

  test('checkHealthAsync_default_returnsHealthyReport', async () => {
    const options = defaultOptions
    const healthCheckService = new DefaultHealthCheckService(options)
    const report = await healthCheckService.checkHealthAsync()

    const expected = 'Healthy'
    const actual = report.status

    expect(actual).toStrictEqual(expected)
  })

  test('checkHealthAsync_readinessPredicate_returnsReadinessReportEntries', async () => {
    const options = defaultOptions
    const healthCheckService = new DefaultHealthCheckService(options)
    const report = await healthCheckService.checkHealthAsync((predicate) =>
      predicate.tags.includes('readiness')
    )

    const expected = options.registrations.filter((x) =>
      x.tags.includes('readiness')
    ).length
    const actual = Object.values(report.entries).filter((x) =>
      x.tags.includes('readiness')
    ).length

    expect(actual).toStrictEqual(expected)
  })

  test('checkHealthAsync_includeDegradedHealthCheck_returnsDegradedReport', async () => {
    const options: HealthCheckServiceOptions = {
      ...defaultOptions,
      registrations: [
        ...defaultOptions.registrations,
        {
          name: 'degraded-1',
          instance: new StubHealthCheck('Degraded'),
          tags: ['liveness'],
        },
        {
          name: 'healthy-4',
          instance: new StubHealthCheck('Healthy'),
          tags: ['liveness'],
        },
      ],
    }
    const healthCheckService = new DefaultHealthCheckService(options)
    const report = await healthCheckService.checkHealthAsync()

    const expected = 'Degraded'
    const actual = report.status

    expect(actual).toStrictEqual(expected)
  })

  test('checkHealthAsync_includeUnhealthyHealthCheck_returnsUnhealthyReport', async () => {
    const options: HealthCheckServiceOptions = {
      ...defaultOptions,
      registrations: [
        ...defaultOptions.registrations,
        {
          name: 'degraded-1',
          instance: new StubHealthCheck('Degraded'),
          tags: ['liveness'],
        },
        {
          name: 'unhealthy-1',
          instance: new StubHealthCheck('Unhealthy'),
          tags: ['liveness'],
        },
      ],
    }
    const healthCheckService = new DefaultHealthCheckService(options)
    const report = await healthCheckService.checkHealthAsync()

    const expected = 'Unhealthy'
    const actual = report.status

    expect(actual).toStrictEqual(expected)
  })
})
