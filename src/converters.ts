import { HealthReport, UIHealthReport } from './schemas'
import { parseErrorMessage } from './utils'

export class UIHealthReportConverter {
  static fromHealthReport(report: HealthReport): UIHealthReport {
    return {
      status: report.status,
      totalDuration: report.totalDuration,
      entries: Object.entries(report.entries).reduce((acc, [key, value]) => {
        if (key === 'exception' && value) {
          acc[key] = parseErrorMessage(value)
        }
        return acc
      }, {}),
    }
  }
}

export class DurationConverter {
  static fromMilliseconds(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    const remainingSeconds = seconds % 60
    const remainingMinutes = minutes % 60
    const remainingMilliseconds = milliseconds % 1000

    const duration = `${hours.toString().padStart(2, '0')}:${remainingMinutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}.${remainingMilliseconds.toString().padStart(3, '0')}`

    return duration
  }

  static toMilliseconds(duration: string): number {
    const [hours, minutes, secondsAndMilliseconds] = duration.split(':')
    const [seconds, milliseconds] = secondsAndMilliseconds.split('.')
    return (
      +hours * 60 * 60 * 1000 +
      +minutes * 60 * 1000 +
      +seconds * 1000 +
      +milliseconds
    )
  }
}
