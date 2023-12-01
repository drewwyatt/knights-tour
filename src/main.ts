import { Activity, Space, newBoard, getNextMove, isComplete, prettyPrint } from '~/models'

let position: Space = 0
let moveCount = 0
const board = newBoard()
board[position] = moveCount

const indicator = new Activity('main', { position, moveCount })

try {
  while (!isComplete(board)) {
    indicator.update({ position, moveCount })
    const move = getNextMove(board, position)
    board[move] = ++moveCount
    position = move
  }

  indicator.succeed()
  console.log(prettyPrint(board))
} catch (err: unknown) {
  if (err instanceof Error) {
    indicator.fail(err.message)
  } else {
    indicator.fail()
  }

  console.error(err)
}
