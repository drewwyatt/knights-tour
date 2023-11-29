import { Space, translate } from './board'

describe('translate', () => {
  const table = (
    start: number,
    rankDelta: number,
    fileDelta: number,
    expectation: number | null,
  ) => ({
    start,
    rankDelta,
    fileDelta,
    expectation,
  })

  it.each([
    table(20, 1, -2, 5),
    table(20, 2, -1, 14),
    table(20, 2, 1, 30),
    table(20, 1, 2, 37),
    table(20, -1, 2, 35),
    table(20, -2, 1, 26),
    table(20, 2, -1, 14),
    table(20, -1, -2, 3),
    table(22, 2, 1, null),
    table(14, 1, -2, null),
    table(49, -2, 1, null),
    table(49, 1, 2, null),
  ])(
    'translate($start, $rankDelta, $fileDelta) => $expectation',
    ({ start, rankDelta, fileDelta, expectation }) =>
      expect(translate(start as Space, rankDelta, fileDelta)).toEqual(expectation),
  )
})
