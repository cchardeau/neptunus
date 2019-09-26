/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import GPX from '../gpx'

describe('open', () => {
  test('should open file', () => {
    // initial
    const gpx = new GPX()

    // when
    const output = gpx.open('./env/thabor.gpx')

    // then
    expect(output).toHaveLength(292142)
  })

  test('should throw error when file is missing', () => {
    // initial
    const gpx = new GPX()

    // when - then
    try {
      gpx.open('./env/thisfiledoesnotexist.gpx')
    } catch (err) {
      expect(err.message).toBe('ENOENT: no such file or directory, open \'./env/thisfiledoesnotexist.gpx\'')
    }
  })
})

describe('parse', () => {
  test('should return parsed content', async () => {
    // initial
    const gpx = new GPX()
    const file = gpx.open('./env/thabor.gpx')

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