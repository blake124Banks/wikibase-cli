// Accept anything looking like an id:
// Q33977
// or q33977
// or wd:Q33977
// or 33977
// or https://www.wikidata.org/entity/Q33977
// or https://inventaire.io/entity/wd:Q33977
// or even azfzafzaQ33977afz

import { isNumericId } from 'wikibase-sdk'
import errors_ from './errors.js'

const entityIdPattern = /(Q|P|L|M)[1-9][0-9]*/
const nestedEntityIdPattern = /L[1-9][0-9]*-(F|S)[1-9][0-9]*/
const entitySchemaIdPattern = /(E)[1-9][0-9]*/

export function tolerantIdParserFactory (options = {}) {
  return function tolerantIdParser (input) {
    input = input.toUpperCase()
    const { allowNestedIds = false, allowEntitiesSchemasIds = false } = options

    if (allowNestedIds) {
      const nestedEntityIdMatch = input.match(nestedEntityIdPattern)
      if (nestedEntityIdMatch) return nestedEntityIdMatch[0]
    }

    if (allowEntitiesSchemasIds) {
      const entitySchemaIdMatch = input.match(entitySchemaIdPattern)
      if (entitySchemaIdMatch) return entitySchemaIdMatch[0]
    }

    const entityIdMatch = input.match(entityIdPattern)
    if (entityIdMatch) return entityIdMatch[0]

    if (isNumericId(input)) return `Q${input}`

    throw errors_.new('invalid id', { input, allowNestedIds, allowEntitiesSchemasIds })
  }
}
