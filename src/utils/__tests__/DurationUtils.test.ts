import { DurationUtils } from '../DurationUtils'

describe('DurationUtils', () => {
  test('fromMilliseconds_threeSecondsMs_returnsThreeSecondsDuration', () => {
    const input = 3 * 1000

    const expected = '00:00:03.000'
    const actual = DurationUtils.fromMilliseconds(input)

    expect(actual).toStrictEqual(expected)
  })

  test('fromMilliseconds_threeMinsMs_returnsThreeMinsDuration', () => {
    const input = 3 * 60 * 1000

    const expected = '00:03:00.000'
    const actual = DurationUtils.fromMilliseconds(input)

    expect(actual).toStrictEqual(expected)
  })

  test('fromMilliseconds_threeHoursMs_returnsThreeHoursDuration', () => {
    const input = 3 * 60 * 60 * 1000

    const expected = '03:00:00.000'
    const actual = DurationUtils.fromMilliseconds(input)

    expect(actual).toStrictEqual(expected)
  })

  test('toMilliseconds_threeSecondsDuration_returnsThreeSecondsMs', () => {
    const input = '00:00:03.000'

    const expected = 3 * 1000
    const actual = DurationUtils.toMilliseconds(input)

    expect(actual).toStrictEqual(expected)
  })

  test('toMilliseconds_threeMinsDuration_returnsThreeMinsMs', () => {
    const input = '00:03:00.000'

    const expected = 3 * 60 * 1000
    const actual = DurationUtils.toMilliseconds(input)

    expect(actual).toStrictEqual(expected)
  })

  test('toMilliseconds_threeHoursDuration_returnsThreeHoursMs', () => {
    const input = '03:00:00.000'

    const expected = 3 * 60 * 60 * 1000
    const actual = DurationUtils.toMilliseconds(input)

    expect(actual).toStrictEqual(expected)
  })
})
