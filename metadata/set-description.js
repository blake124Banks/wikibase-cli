import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'sd',
  args: '<entity> <language> <description>',
  description: 'set a description on an entity in a given language',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 fr "description du Bac à sable bulgroz"', comment: "set the description 'description du Bac à sable bulgroz' to the Sandbox entity (Q4115189) in French" },
  ],
}
