import _ from 'lodash'

export const unvisited = -1
export const isUnvisited = (space: number) => space === unvisited

let currentSpace = 0
const board = _.range(8 * 8).map(_.constant(unvisited))
board[0] = currentSpace++

export default board
