/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import Welder from '../welder'
import { Trackpoint } from '..'

describe('match', () => {
  test('should return welded GPX content', () => {
    // initial
    const welder = new Welder()
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
            }, {
              $: {
                lat: '45.1071520',
                lon: '6.5782530'
              }
            }]
          }]
        }]
      }
    }
    const mappedTrackpoints = [{
      trkId: 0,
      trksegId: 0,
      trkptId: 0,
      latitude: '45.107102',
      longitude: '6.578242'
    }, {
      trkId: 0,
      trksegId: 0,
      trkptId: 1,
      latitude: undefined as unknown as Trackpoint['latitude'],
      longitude: undefined as unknown as Trackpoint['longitude']
    }, {
      trkId: 0,
      trksegId: 0,
      trkptId: 2,
      latitude: '45.107106',
      longitude: '6.578217'
    }]

    // when
    const output = welder.weld(content, mappedTrackpoints)

    // then
    expect(output.replace(/\s/g, '')).toBe('<?xmlversion="1.0"encoding="UTF-8"standalone="yes"?><gpx><trk><name>Thabor</name><type>4</type><trkseg><trkptlat="45.107102"lon="6.578242"/><trkptlat="45.107106"lon="6.578217"/></trkseg></trk></gpx>')
  })
})