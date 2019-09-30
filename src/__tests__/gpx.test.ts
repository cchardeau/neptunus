/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import GPX from '../gpx'
import { readFileSync } from 'fs'

describe('parse', () => {
  test('should return parsed content', async () => {
    // initial
    const gpx = new GPX()
    const file = readFileSync('./env/thabor.gpx', 'utf-8')

    // when
    const output = await gpx.parse(file)

    // then
    expect(output).toBeInstanceOf(Object)
    expect(output.gpx).toBeDefined()
  })

  test('should throw error with invalid file content', async () => {
    // initial
    const gpx = new GPX()
    const file = 'invalid'

    // when - then
    try {
      await gpx.parse(file)
    } catch (err) {
      expect(err.message).toBe('Non-whitespace before first tag.\nLine: 0\nColumn: 1\nChar: i')
    }
  })
})