import { Slug } from './slug'

it('Should be able to create a new Slug from text', () => {
  const slug = Slug.createFromText('Example question title')

  expect(slug.value).toEqual('example-question-title')
})
