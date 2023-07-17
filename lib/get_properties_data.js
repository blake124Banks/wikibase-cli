import { simplify } from 'wikibase-sdk'
import getEntities from './get_entities.js'

export default async (ids, lang = 'en') => {
  const properties = await getEntities({
    ids,
    languages: [ lang, 'en' ],
    props: [ 'info', 'labels' ],
  })
  const propertiesData = {}
  Object.keys(properties).forEach(id => {
    const property = properties[id]
    const labels = simplify.labels(property.labels)
    propertiesData[id] = {
      type: property.datatype,
      label: labels[lang] || labels.en,
    }
  })
  return propertiesData
}
