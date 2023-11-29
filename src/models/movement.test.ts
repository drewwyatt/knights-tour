import { newBoard } from './board'
import { getPossibleMoves } from './movement'

describe('getPossibleMoves', () => {
  /**
   *  0  1  2  3  4  5  6  7
   *  8  9 10 11 12 13 14 15
   * 16 17 18 👍 20 👍 22 23
   * 24 25 👍 27 28 29 👍 31
   * 32 33 34 35 ♞ 37 38 39
   * 40 41 👍 43 44 45 👍 47
   * 48 49 50 👍 52 👍 54 55
   * 56 57 58 59 60 61 62 63
   */
  test('returns all moves when all moves would be valid and unvisted', () => {
    const board = newBoard()
    board[36] = 1 // ♞

    expect(getPossibleMoves(board, 36)).toEqual([21, 30, 46, 53, 51, 42, 26, 19])
  })

  /**
   * 🛑 = visited
   *  0  1  2  3  4  5  6  7
   *  8  9 10 11 12 13 14 15
   * 16 17 18 19 20 21 22 23
   * 24 25 26 27 28 👍 30 👍
   * 32 33 34 35 🛑 37 38 39
   * 40 41 42 43 44 45 ♞  47
   * 48 49 50 51 👍 53 54 55
   * 56 57 58 59 60 🛑 62 👍
   */
  test('only returns moves for valid, unvisted spaces', () => {
    const board = newBoard()
    board[36] = 1
    board[61] = 2
    board[46] = 3 // ♞

    expect(getPossibleMoves(board, 46)).toEqual([31, 63, 52, 29])
  })
})
