/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import { Builder } from 'xml2js'
import { cloneDeep, set, unset } from 'lodash'
import { Trackpoint } from '.'

export default class Welder {
  weld(content: any, mappedTrackpoints: ReadonlyArray<Trackpoint>) {
    const builder = new Builder() 
    const output = cloneDeep(content)
  
    for (const mappedTrackpoint of mappedTrackpoints) {
      if (mappedTrackpoint.latitude && mappedTrackpoint.longitude) {
        set(output, `gpx.trk[${mappedTrackpoint.trkId}].trkseg[${mappedTrackpoint.trksegId}].trkpt[${mappedTrackpoint.trkptId}].$`, {
          lat: mappedTrackpoint.latitude,
          lon: mappedTrackpoint.longitude
        })
      } else {
        unset(output, `gpx.trk[${mappedTrackpoint.trkId}].trkseg[${mappedTrackpoint.trksegId}].trkpt[${mappedTrackpoint.trkptId}]`)
      }
    }

    return builder.buildObject(output)
  }
}