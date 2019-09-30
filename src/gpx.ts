/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import { Parser } from 'xml2js'

export default class GPX {
  async parse(file: string) {
    const parser = new Parser()
    return parser.parseStringPromise(file) 
  }
}
