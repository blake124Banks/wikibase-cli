import { isEntitySchemaId, simplifyEntity } from 'wikibase-sdk'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import optionsFactory from '#lib/parse_simplify_options'
import dropNonSelectedSubprops from './drop_non_selected_subprops.js'
import { getEntitiesByBatches } from './get_entities_by_batches.js'
import { getEntitiesSchemas } from './get_entities_schemas.js'
import getTtlEntities from './get_ttl_entities.js'
import logNdjson from './log_ndjson.js'
import parseProps from './parse_props.js'
import program from './program.js'

export function fetchAndLogIdsData (ids) {
  exitOnMissingInstance(program.instance)
  const requestedPropsAndSubProps = parseProps(program.props)
  const requestedProps = Object.keys(requestedPropsAndSubProps)
  const options = optionsFactory(program)
  const { simplify: simplifyFlag, format } = program

  if (format === 'ttl') return getTtlEntities(ids)

  const entitiesSchemasIds = ids.filter(isEntitySchemaId)

  if (entitiesSchemasIds.length > 0) return getEntitiesSchemas(entitiesSchemasIds)

  const onResponse = entities => {
    entities.forEach(entity => dropNonSelectedSubprops(entity, requestedPropsAndSubProps))
    if (simplifyFlag) {
      entities = entities.map(entity => simplifyEntity(entity, options))
    }
    logNdjson(entities)
  }

  return getEntitiesByBatches({ ids, props: requestedProps, onResponse })
}
