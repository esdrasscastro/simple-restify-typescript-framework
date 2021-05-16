import Example from '@modules/example/Example'

test('It should have INIT in class', () => {
  const example = new Example()

  expect(example).toHaveProperty('init')
})
