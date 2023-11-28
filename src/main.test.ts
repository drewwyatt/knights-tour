import { hello } from './main'

test('main', () => {
  expect(hello('world')).toEqual('Hello, world!')
})
