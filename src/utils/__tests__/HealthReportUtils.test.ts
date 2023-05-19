import { HealthReportEntry } from '@/schemas'
import { HealthReportUtils } from '../HealthReportUtils'

describe('HealthReportUtils', () => {
  test('getMinStatusByEntries_includeDegradedEntry_returnsDegraded', () => {
    const input: Record<string, HealthReportEntry> = {
      ['healthy-0']: {
        status: 'Healthy',
        duration: '00:00:00.000',
      },
      ['degraded-1']: {
        status: 'Degraded',
        duration: '00:00:00.000',
      },
      ['healthy-1']: {
        status: 'Healthy',
        duration: '00:00:00.000',
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
      },
      ['degraded-1']: {
        status: 'Degraded',
        duration: '00:00:00.000',
      },
      ['unhealthy-1']: {
        status: 'Unhealthy',
        duration: '00:00:00.000',
      },
      ['healthy-1']: {
        status: 'Healthy',
        duration: '00:00:00.000',
      },
    }

    const expected = 'Unhealthy'
    const actual = HealthReportUtils.getMinStatusByEntries(input)

    expect(actual).toStrictEqual(expected)
  })
})
