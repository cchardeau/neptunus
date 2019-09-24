/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import neptunus from '../lib/index'

test('should be polite', () => {
  // initial
  const instance = new neptunus()

  // when
  const output = instance.greetings()

  // then
  expect(output).toBe('Hello from neptunus!')
})