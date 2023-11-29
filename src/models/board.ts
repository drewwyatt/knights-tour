import _ from 'lodash'
import type { FixedLengthArray, IntRange, Tagged } from 'type-fest'

/**
 *  0  1  2  3  4  5  6  7
 *  8  9 10 11 12 13 14 15
 * 16 17 18 19 20 21 22 23
 * 24 25 26 27 28 29 30 31
 * 32 33 34 35 36 37 38 39
 * 40 41 42 43 44 45 46 47
 * 48 49 50 51 52 53 54 55
 * 56 57 58 59 60 61 62 63
 */

export type Board = Tagged<FixedLengthArray<number, 64>, 'board'>
export type Space = IntRange<0, 64>

const meta = {
  width: 8,
  height: 8,
  size: 8 * 8,
  rankBounds: {
    min: _.range(0, 8 * 8, 8),
    max: _.range(7, 8 * 8, 8),
  },
}

const isValidShift = (start: Space, shift: number) => {
  const rankIndex = Math.floor(start / meta.width)
  if (shift > 0) {
    return meta.rankBounds.max[rankIndex] >= start + shift
  }

  return meta.rankBounds.min[rankIndex] <= start + shift
}

export const unvisited = -1
export const isUnvisited = (board: Board, space: Space | null) =>
  typeof space === 'number' && board[space] === unvisited
const isSpace = (index: number): index is Space => index >= 0 && index <= 63

export const newBoard = (): Board => {
  const board = _.range(meta.size).map(_.constant(unvisited))
  board[0] = 0
  return board as unknown as Board
}

export const translate = (
  start: Space,
  fileDelta: number,
  rankDelta: number,
): Space | null => {
  if (!isValidShift(start, fileDelta)) return null
  const delta = rankDelta * meta.width + fileDelta
  const space = start + delta

  return isSpace(space) ? space : null
}
