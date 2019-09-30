/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import axios from 'axios'
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

import Mapbox from '../mapbox'

describe('match', () => {
  test('should return matched trackpoints', async () => {
    // initial
    const mapbox = new Mapbox('mapboxAccessToken')
    const trackpoints = [{
      trkId: 0,
      trksegId: 0,
      trkptId: 0,
      latitude: '45.1071760',
      longitude: '6.5782590'
    },
    {
      trkId: 0,
      trksegId: 0,
      trkptId: 1,
      latitude: '45.1071730',
      longitude: '6.5782450'
    },
    {
      trkId: 0,
      trksegId: 0,
      trkptId: 2,
      latitude: '45.1071520',
      longitude: '6.5782530'
    }]


    // mock
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: {
        tracepoints: [
          { location: [6.578242, 45.107102] },
          null,
          { location: [6.578217, 45.107106] }]
      }
    })

    // when
    const output = await mapbox.match(trackpoints)

    // then
    expect(output).toStrictEqual([{
      trkId: 0,
      trksegId: 0,
      trkptId: 0,
      latitude: 6.578242,
      longitude: 45.107102
    },
    undefined,
    {
      trkId: 0,
      trksegId: 0,
      trkptId: 2,
      latitude: 6.578217,
      longitude: 45.107106
    }])
  })

  test('should return an empty array if an error is returned by mapbox', async () => {
    // initial
    const mapbox = new Mapbox('mapboxAccessToken')
    const trackpoints = [{
      trkId: 0,
      trksegId: 0,
      trkptId: 0,
      latitude: '45.1071760',
      longitude: '6.5782590'
    },
    {
      trkId: 0,
      trksegId: 0,
      trkptId: 1,
      latitude: '45.1071730',
      longitude: '6.5782450'
    },
    {
      trkId: 0,
      trksegId: 0,
      trkptId: 2,
      latitude: '45.1071520',
      longitude: '6.5782530'
    }]

    // mock
    mockAxios.get.mockResolvedValue({
      status: 500
    })

    // when
    const output = await mapbox.match(trackpoints)

    // then
    expect(output).toStrictEqual([])
  })
})
