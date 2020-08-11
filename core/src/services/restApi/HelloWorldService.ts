import { BaseService } from "../BaseService";

export class HelloWorldService implements BaseService {
    get(req: Express.Request, resp: Express.Response) {
        throw new Error("Method not implemented.");
    }
    post(req: Express.Request, resp: Express.Response) {
        throw new Error("Method not implemented.");
    }
    put(req: Express.Request, resp: Express.Response) {
        throw new Error("Method not implemented.");
    }
    delete(req: Express.Request, resp: Express.Response) {
        throw new Error("Method not implemented.");
    }
}