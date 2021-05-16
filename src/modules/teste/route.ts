import Factory from '@binaries/Factory'
import Teste from '@modules/teste/Teste'

Factory.get('/teste', Teste, 'teste')
