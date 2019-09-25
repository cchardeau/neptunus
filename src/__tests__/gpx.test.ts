/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import GPX from '../gpx'

describe('open', () => {
  test('should open file', () => {
    // initial
    const instance = new GPX()

    // when
    const output = instance.open('./env/thabor.gpx')

    // then
    expect(output).toHaveLength(292142)
  })

  test('should throw error when file is missing', () => {
    // initial
    const instance = new GPX()

    // when - then
    try {
      instance.open('./env/thisfiledoesnotexist.gpx')
    } catch (err) {
      expect(err.message).toBe('ENOENT: no such file or directory, open \'./env/thisfiledoesnotexist.gpx\'')
    }
  })
})

describe('parse', () => {
  test('should return parsed content', async () => {
    // initial
    const instance = new GPX()
    const file = instance.open('./env/thabor.gpx')

    // when
    const output = await instance.parse(file)

    // then
    expect(output).toBeInstanceOf(Object)
    expect(output.gpx).toBeDefined()
  })
})