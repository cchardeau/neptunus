/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import { get } from 'lodash'
import { Trackpoint } from '.'

export default class Extractor {
  extract(content: object) {
    const output: Trackpoint[] = []
  
    // trks
    const trks = get(content, 'gpx.trk')
    if (trks) {
      trks.forEach((trk: any, trkId: number) => {
        
        // trksegs
        const trksegs = get(content, `gpx.trk[${trkId}].trkseg`)
        if (trksegs) {
          trksegs.forEach((trkseg: any, trksegId: number) => {
            
            // trkpts
            const trkpts = get(content, `gpx.trk[${trkId}].trkseg[${trksegId}].trkpt`)
            if (trkpts) {
              trkpts.forEach((trkpt: any, trkptId: number) => {
                output.push({
                  trkId,
                  trksegId,
                  trkptId,
                  latitude: trkpt['$'].lat,
                  longitude: trkpt['$'].lon
                })
              })
            }

          })
        }

      })
    }

    return output
  }
}