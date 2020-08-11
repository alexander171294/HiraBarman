export interface BaseService {
    get(req: Express.Request, resp: Express.Response);
    post(req: Express.Request, resp: Express.Response);
    put(req: Express.Request, resp: Express.Response);
    delete(req: Express.Request, resp: Express.Response);
}