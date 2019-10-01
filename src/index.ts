/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import GPX from './gpx'
import Extractor from './extractor'
import Mapbox from './mapbox'
import Welder from './welder'

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
    const welder = new Welder()

    // parse file content
    const content = await gpx.parse(file)

    // extract trackpoints from file content
    const trackpoints = extractor.extract(content)

    // get mapped trackpoints
    const mappedTrackpoints = await mapbox.match(trackpoints)

    // return gpx file with matched trackpoints
    return welder.weld(content, mappedTrackpoints)
  }
}