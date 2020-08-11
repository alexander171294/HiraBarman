import { BaseService } from "../BaseService";
import * as express from 'express';

export class HelloWorldService implements BaseService {
    get(req: express.Request, resp: express.Response) {
        resp.send('Hello World');
    }
    getOne(req: express.Request, resp: express.Response) {
        resp.send('Hello World');
    }
    post(req: express.Request, resp: express.Response) {
        resp.send('Hello World');
    }
    put(req: express.Request, resp: express.Response) {
        resp.send('Hello World');
    }
    delete(req: express.Request, resp: express.Response) {
        resp.send('Hello World');
    }
}