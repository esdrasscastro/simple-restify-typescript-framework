import SampleList from "@modules/samples/SampleList";
import { Response } from "node-fetch";
import utils from '../../utils/utils'


describe('Execute Samples Tests', () => {
    let SampleListInstance: SampleList

    beforeEach(() => {
        SampleListInstance = new SampleList()
    })

    describe('SampleList class test', () => {
        it('Should create a SampleList instace', async () => {
            expect(SampleListInstance).toBeInstanceOf(SampleList)
            
            const resp = await SampleListInstance.init(utils.Request, utils.Response, () => {})
            expect(utils.Response.code).toBe(200)
        })
    })
})