import Factory from '@binaries/Factory'
import Example from '@modules/example/Example'

Factory.getCustom('/example-custom', Example)

Factory.get('/example', [], Factory.build(Example, 'example'))

Factory.get('/example-2', [], (new Example().exampleTest))
