import { Activity, Space, newBoard, getNextMove, isComplete, prettyPrint } from '~/models'

let position: Space = 0
let moveCount = 0
const board = newBoard()
board[position] = moveCount

const activity = new Activity('main', { position, moveCount })

try {
  while (!isComplete(board)) {
    activity.update({ position, moveCount })
    const move = getNextMove(board, position)
    board[move] = ++moveCount
    position = move
  }

  activity.succeed()
  console.log(prettyPrint(board))
} catch (err: unknown) {
  if (err instanceof Error) {
    activity.fail(err.message)
  } else {
    activity.fail()
  }

  console.error(err)
}
