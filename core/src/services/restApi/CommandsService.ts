import { BaseService } from "../BaseService";
import { CommandsModel } from "../../database/CommandsModel";
import * as express from 'express';

export class CommandService implements BaseService {

    private commandsModel: CommandsModel;

    constructor() {
        this.commandsModel = CommandsModel.getInstance();
    }

    get(req: express.Request, resp: express.Response) {
        resp.send(this.commandsModel.getCommands({}));
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