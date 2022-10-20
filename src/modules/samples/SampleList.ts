import { Request, Response, Next } from "restify";

export default class SampleList {
    async init(req: Request, res: Response, next: Next) {
        res.send(200, 'Return sample list');
        return next();
    }
}