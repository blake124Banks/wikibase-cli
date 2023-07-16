import 'should'
import { wbDry } from '#test/lib/utils'

describe('wb set-label', () => {
  it('should accept an id, a lang, and a value', async () => {
    const { stdout, stderr } = await wbDry('set-label Q4115189 fr foo')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('label')
    action.should.equal('set')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        language: 'fr',
        value: 'foo',
      },
    ])
  })
})
