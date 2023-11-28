import _ from 'lodash'
import board from '~/models/board'

export const hello = (name: string) => `Hello, ${name}!`

const ranks = _.chunk(board, 8)
console.log(ranks)
