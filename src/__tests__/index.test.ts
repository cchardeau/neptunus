/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import { readFileSync } from 'fs'
import axios from 'axios'

import Neptunus from '../index'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('greetings', () => {
  test('should be polite', () => {
    // initial
    const neptunus = new Neptunus({ mapboxAccessToken: 'mapboxAccessToken' })

    // when
    const output = neptunus.greetings()

    // then
    expect(output).toBe('Hello from neptunus!')
  })
})

describe('match', () => {
  test('should return a gpx file with matched trackpoints', async () => {
    // initial
    const neptunus = new Neptunus({ mapboxAccessToken: 'mapboxAccessToken' })
    const file = readFileSync('./env/thabor.gpx', 'utf-8')

    // mock
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: {
        tracepoints: [
          { location: [6.578242, 45.107102] },
          { location: [6.578229, 45.107104] },
          { location: [6.578217, 45.107106] }
        ]
      }
    })

    // when
    const output = await neptunus.match(file)

    // then
    expect(output).toBeDefined()

    // clean
    mockAxios.get.mockReset()
  })
})