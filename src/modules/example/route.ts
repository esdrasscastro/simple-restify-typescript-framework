import Factory from '@binaries/Factory'
import Example from '@modules/example/Example'

Factory.get('/example', Example)
Factory.post('/example', Example, 'teste')

/* Factory.post('/example', Example)
Factory.get('/example', Example, 'teste') */
