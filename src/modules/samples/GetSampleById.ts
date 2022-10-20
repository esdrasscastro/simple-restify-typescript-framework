import { Request, Response, Next } from "restify";

export default class GetSamplebyId {
    async init(req: Request, res: Response, next: Next) {
        res.send(200, 'get sample by id');
        return next();
    }
}