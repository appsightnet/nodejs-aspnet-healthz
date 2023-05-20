import { HealthReportEntry } from '../../schemas'
import { HealthReportUtils } from '../HealthReportUtils'

describe('HealthReportUtils', () => {
  test('getMinStatusByEntries_includeDegradedEntry_returnsDegraded', () => {
    const input: Record<string, HealthReportEntry> = {
      ['healthy-0']: {
        status: 'Healthy',
        duration: '00:00:00.000',
        tags: [],
      },
      ['degraded-0']: {
        status: 'Degraded',
        duration: '00:00:00.000',
        tags: [],
      },
      ['healthy-1']: {
        status: 'Healthy',
        duration: '00:00:00.000',
        tags: [],
      },
    }

    const expected = 'Degraded'
    const actual = HealthReportUtils.getMinStatusByEntries(input)

    expect(actual).toStrictEqual(expected)
  })

  test('getMinStatusByEntries_includeUnhealthyEntry_returnsUnhealthy', () => {
    const input: Record<string, HealthReportEntry> = {
      ['healthy-0']: {
        status: 'Healthy',
        duration: '00:00:00.000',
        tags: [],
      },
      ['degraded-0']: {
        status: 'Degraded',
        duration: '00:00:00.000',
        tags: [],
      },
      ['unhealthy-0']: {
        status: 'Unhealthy',
        duration: '00:00:00.000',
        tags: [],
      },
      ['healthy-1']: {
        status: 'Healthy',
        duration: '00:00:00.000',
        tags: [],
      },
    }

    const expected = 'Unhealthy'
    const actual = HealthReportUtils.getMinStatusByEntries(input)

    expect(actual).toStrictEqual(expected)
  })
})
