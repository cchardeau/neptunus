/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

export type Trackpoint = {
  trkId: number
  trksegId: number
  trkptId: number
  latitude: string
  longitude: string
}

import GPX from './gpx'
import Extractor from './extractor'

export default class neptunus {
  greetings() {
    return 'Hello from neptunus!'
  }

  async match(path: string) {
    const gpx = new GPX()
    const extractor = new Extractor()

    // open file
    const file = gpx.open(path)

    // parse file content
    const content = gpx.parse(file)

    // extract trackpoints from file content
    const trackpoints = extractor.extract(content)

    // get mapped trackpoints
    console.log(trackpoints)
  }
}
