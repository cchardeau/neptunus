/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

type NeptunusConfig = {
  mapboxAccessToken: string
}

export type Trackpoint = {
  trkId: number
  trksegId: number
  trkptId: number
  latitude: string
  longitude: string
}

import GPX from './gpx'
import Extractor from './extractor'
import Mapbox from './mapbox'

export default class Neptunus {
  config: NeptunusConfig

  constructor (config: NeptunusConfig) {
    this.config = config
  }

  greetings() {
    return 'Hello from neptunus!'
  }

  async match(file: string) {
    const gpx = new GPX()
    const extractor = new Extractor()
    const mapbox = new Mapbox(this.config.mapboxAccessToken)

    // parse file content
    const content = await gpx.parse(file)

    // extract trackpoints from file content
    const trackpoints = extractor.extract(content)

    // get mapped trackpoints
    const mappedTrackpoints = await mapbox.match(trackpoints)

    // return gpx file with matched trackpoints
    console.log(mappedTrackpoints)

    return undefined
  }
}
