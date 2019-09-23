/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import { greetings } from '../'

test('greetings', () => {
  // when
  const output = greetings()

  // then
  expect(output).toBe('Hello from neptunus!')
})