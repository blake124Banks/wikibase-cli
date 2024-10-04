export default {
  alias: 'd',
  args: '<entity>',
  description: "output the entity's data",
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: false,
    instance: true,
    sparqlEndpoint: false,
  },
  examples: [
    { args: 'Q123', comment: "fetch Q123's raw data" },
    { args: '--props labels,claims,sitelinks Q123', comment: "fetch Q123's labels, claims, and sitelinks only" },
    { args: '--simplify Q123', comment: 'fetch Q123 simplified data' },
    { args: '--simplify --keep ids,references,qualifiers,hashes,nontruthy Q123', comment: 'simplified Q123 data, but keep some attributes' },
    { args: '--simplify --keep all Q123', comment: 'same as above' },
    { args: 'Q1496 | jq .labels.pt', comment: "take advantage of the raw data being output as JSON\n    # to pass it to jq (a JSON parsers https://jqlang.github.io/jq/)\n    # and get only the piece of data you're looking for" },
    { args: '--simplify --keep ids Q123 | jq .claims.P138 -j', comment: 'get Q123 P138 claims ids' },
  ],
}
