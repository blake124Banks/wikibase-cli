import { entityAttributeCommandsOptions } from '#lib/common_options'

export default {
  alias: 'u',
  args: '<entity>',
  description: 'display basic information on the requested entity',
  options: Object.assign({ clipboard: false }, entityAttributeCommandsOptions),
  examples: [
    { args: 'Q123', comment: 'display basic information for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'display basic information for the entity Q123 in Japanese' },
    { args: 'Q1 -p P3219,P2612', comment: 'display the summary with additional properties' },
  ],
}
