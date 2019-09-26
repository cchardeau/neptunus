/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import Extractor from '../extractor'

describe('extract', () => {
  test('should extract trackpoints from content', async () => {
    // initial
    const extractor = new Extractor()
    const content = {
      gpx: {
        trk: [{
          name: ['Thabor'],
          type: ['4'],
          trkseg: [{
            trkpt: [{
              $: {
                lat: '45.1071760',
                lon: '6.5782590'
              }
            }, {
              $: {
                lat: '45.1071730',
                lon: '6.5782450'
              }
            }]
          }]
        }]
      }
    }

    // when
    const output = extractor.extract(content)

    // then
    expect(output).toStrictEqual([{
      trkId: 0,
      trksegId: 0,
      trkptId: 0,
      latitude: '45.1071760',
      longitude: '6.5782590'
    }, {
      trkId: 0,
      trksegId: 0,
      trkptId: 1,
      latitude: '45.1071730',
      longitude: '6.5782450'
    }])
  })

  test('should return an empty array when trk is invalid', async () => {
    // initial
    const extractor = new Extractor()
    const content = {
      gpx: {
        invalid: [{
          name: ['Thabor'],
          type: ['4'],
          trkseg: [{
            trkpt: [{
              $: {
                lat: '45.1071760',
                lon: '6.5782590'
              }
            }]
          }]
        }]
      }
    }

    // when
    const output = extractor.extract(content)

    // then
    expect(output).toStrictEqual([])
  })

  test('should return an empty array when trkseg is invalid', async () => {
    // initial
    const extractor = new Extractor()
    const content = {
      gpx: {
        trk: [{
          name: ['Thabor'],
          type: ['4'],
          invalid: [{
            trkpt: [{
              $: {
                lat: '45.1071760',
                lon: '6.5782590'
              }
            }]
          }]
        }]
      }
    }

    // when
    const output = extractor.extract(content)

    // then
    expect(output).toStrictEqual([])
  })

  test('should return an empty array when trkpt is invalid', async () => {
    // initial
    const extractor = new Extractor()
    const content = {
      gpx: {
        trk: [{
          name: ['Thabor'],
          type: ['4'],
          trkseg: [{
            invalid: [{
              $: {
                lat: '45.1071760',
                lon: '6.5782590'
              }
            }]
          }]
        }]
      }
    }

    // when
    const output = extractor.extract(content)

    // then
    expect(output).toStrictEqual([])
  })
})