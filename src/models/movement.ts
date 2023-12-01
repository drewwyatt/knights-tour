import _ from 'lodash'
import invariant from 'tiny-invariant'
import { type Board, type Space, isUnvisited, translate } from './board'

type Delta = -2 | -1 | 1 | 2

const moveFactory =
  (board: Board, current: Space) =>
  (rankDelta: Delta, fileDelta: Delta): Space | null => {
    const t = translate(current, rankDelta, fileDelta)
    return isUnvisited(board, t) ? t : null
  }

export const getPossibleMoves = (board: Board, current: Space) => {
  const tryMove = moveFactory(board, current)
  return [
    tryMove(1, -2), // 1:00
    tryMove(2, -1), // 2:00
    tryMove(2, 1), // 4:00
    tryMove(1, 2), // 5:00
    tryMove(-1, 2), // 7:00
    tryMove(-2, 1), // 8:00
    tryMove(-2, -1), // 10:00
    tryMove(-1, -2), // 11:00
  ].filter(_.isNumber) as Space[]
}

export const getNextMove = (_board: Board, current: Space) => {
  const board = [..._board] as unknown as Board
  const allMoves = getPossibleMoves(board, current)
  board[current] = 99 // mark current space as visited

  const fewestMoves = allMoves.reduce(
    (acc, space) => {
      const moves = getPossibleMoves(board, space)
      if (moves.length < acc.availableMoves) {
        acc = {
          space,
          availableMoves: moves.length,
        }
      }

      return acc
    },
    { space: -1, availableMoves: Infinity },
  )

  invariant(fewestMoves.space > -1, `No moves found for space ${current}`)
  return fewestMoves.space as Space
}
