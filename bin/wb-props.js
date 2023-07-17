#!/usr/bin/env node
import { red } from '#lib/chalk'
import errors_ from '#lib/errors'
import formatPropertiesData from '#lib/format_properties_data'
import getLangProps from '#lib/get_lang_props'
import getPatternFilter from '#lib/get_pattern_filter'
import program from '#lib/program'
import resetProperties from '#lib/reset_properties'

await program
.option('-d, --details', 'include properties labels, types, descriptions, and aliases')
.option('-t, --type [type]', 'include properties types, or if a type is specified, keep only properties with that type')
.option('--no-cache', 'ignore properties cache')
.option('-r, --reset', 'clear properties cache')
.process('props')

// commander converts the no-cache option to a cache boolean
// but that makes where program.cache is undefined (in other commands)
// default to falsy, that is default to noCache=true
program.noCache = !program.cache
const includeAllDetails = program.details
const includeTypes = program.type

if (program.reset) {
  resetProperties()
} else {
  // Any additional arguments are interpreted as a pattern that properties
  // should match `wb props some pattern` <=> `wb props | grep -i "some pattern"`
  const pattern = program.args.join(' ')
  const filter = getPatternFilter(pattern, includeTypes)

  getLangProps(program)
  .then(formatPropertiesData(pattern, filter, includeAllDetails, includeTypes))
  .then(output => {
    if (filter && filter.regex) return output.replace(filter.regex, red(pattern))
    return output
  })
  .then(console.log)
  .catch(errors_.exit)
}
