import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'rc',
  args: '<guids>',
  description: 'remove claims by their GUIDs',
  options: editCommandsOptions,
  examples: [
    { args: 'Q71$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7', comment: 'remove this claim made on Q71' },
  ],
}
