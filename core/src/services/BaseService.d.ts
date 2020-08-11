import * as express from 'express';

export interface BaseService {
    get(req: express.Request, resp: express.Response);
    getOne(req: express.Request, resp: express.Response);
    post(req: express.Request, resp: express.Response);
    put(req: express.Request, resp: express.Response);
    delete(req: express.Request, resp: express.Response);
}