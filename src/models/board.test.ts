import { Space, newBoard, translate } from './board'

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
    table(20, -2, 1, 5),
    table(20, -1, 2, 14),
    table(20, 1, 2, 30),
    table(20, 2, 1, 37),
    table(20, 2, -1, 35),
    table(20, 1, -2, 26),
    table(20, -1, 2, 14),
    table(20, -2, -1, 3),
    table(22, 1, 2, null),
    table(14, -2, 1, null),
    table(49, 1, -2, null),
    table(49, 2, 1, null),
  ])(
    'translate($start, $rankDelta, $fileDelta) => $expectation',
    ({ start, rankDelta, fileDelta, expectation }) =>
      expect(translate(start as Space, rankDelta, fileDelta)).toEqual(expectation),
  )
})
