export default authorId => {
  return `SELECT ?subject WHERE { ?subject wdt:P50 wd:${authorId} . }`
}
