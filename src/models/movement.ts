import _ from 'lodash'
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
  ].filter(_.isNumber)
}
