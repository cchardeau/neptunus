/*!
 * neptunus
 * Copyright(c) 2019 Corentin Chardeau
 * MIT Licensed
 */

import { readFileSync } from 'fs'
import { Parser } from 'xml2js'

export default class GPX {
  open(path: string) {
    return readFileSync(path, 'utf-8')
  }

  async parse(file: string) {
    const parser = new Parser()
    return parser.parseStringPromise(file) 
  }
}
