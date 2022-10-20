import Factory from '@binaries/Factory'
import SampleList from '@modules/samples/SampleList'
import GetSampleById from '@modules/samples/GetSampleById'

Factory.getCustom('/samples/list', SampleList)
Factory.getCustom('/samples/by/:id', GetSampleById)