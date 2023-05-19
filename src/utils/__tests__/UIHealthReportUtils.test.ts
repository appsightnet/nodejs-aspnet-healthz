import { HealthReport, HealthReportEntry } from '@/schemas'
import { UIHealthReportUtils } from '../UIHealthReportUtils'

describe('UIHealthReportUtils', () => {
  test('fromHealthReport_healthReportWithError_returnsUIHealthReportWithErrorMessage', () => {
    const errorMessage = 'test'
    const error = new Error(errorMessage)
    const entry: HealthReportEntry = {
      exception: error,
      duration: '00:00:00.000',
      status: 'Unhealthy',
    }
    const report: HealthReport = {
      entries: {
        ['test-0']: entry,
      },
      status: 'Unhealthy',
      totalDuration: '00:00:00.000',
    }

    const uiReport = UIHealthReportUtils.fromHealthReport(report)

    const expected = errorMessage
    const actual = uiReport.entries['test-0'].exception

    expect(actual).toStrictEqual(expected)
  })
})
