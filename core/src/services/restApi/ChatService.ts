import { BaseService } from "../BaseService";
import * as express from 'express';

export class ChatService implements BaseService {

    constructor() {

    }

    get(req: express.Request, resp: express.Response) {

    }

    getOne(req: express.Request, resp: express.Response) {

    }

    post(req: express.Request, resp: express.Response) {
        console.log(req.body);
        resp.send('OK-post');
    }

    put(req: express.Request, resp: express.Response) {

    }

    delete(req: express.Request, resp: express.Response) {

    }

}