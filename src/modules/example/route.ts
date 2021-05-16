import Factory from '../../bin/Factory'
import Example from './Example'

Factory.get('/example', Example)
Factory.post('/example', Example, 'teste')

/* Factory.post('/example', Example)
Factory.get('/example', Example, 'teste') */
