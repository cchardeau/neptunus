/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import GPX from './gpx'

export default class neptunus {
  greetings() {
    return 'Hello from neptunus!'
  }

  async match(path: string) {
    const gpx = new GPX()

    // open file
    const file = gpx.open(path)

    // parse file content
    const content = gpx.parse(file)

    // extract tracks from file content
    console.log(content)
  }
}
