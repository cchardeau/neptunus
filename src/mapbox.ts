/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import axios from 'axios'
import { chunk, flatten } from 'lodash'
import { Trackpoint } from '.'

const mapboxBaseUrl = 'https://api.mapbox.com/matching/v5'

export default class Mapbox {
  accessToken: string
  
  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  toMatchedTrackpoints(chunk: ReadonlyArray<Trackpoint>, tracepoints: any) {
    return tracepoints.map((tracepoint: any, index: number) => {
      return {
        ...chunk[index],
        longitude: tracepoint ? tracepoint.location[0] : undefined,
        latitude: tracepoint ?  tracepoint.location[1] : undefined
      }
    })
  }

  async match(trackpoints: ReadonlyArray<Trackpoint>) {
    const chunks = chunk(trackpoints, 100)

    const matchedTrackpoints = await Promise.all(chunks.map(async (chunk) => {
      const coordinates = chunk.map((trackpoint) => `${trackpoint.longitude},${trackpoint.latitude}`).join(';')

      const result = await axios.get(`${mapboxBaseUrl}/mapbox/walking/${coordinates}`, { params: { access_token: this.accessToken } })
      if (result && result.status === 200 && result.data && result.data.tracepoints) {
        return this.toMatchedTrackpoints(chunk, result.data.tracepoints)
      }

      return []
    }))

    return flatten(matchedTrackpoints).filter(Boolean)
  }
}