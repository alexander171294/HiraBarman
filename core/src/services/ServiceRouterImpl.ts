import { ServiceRouter } from "./ServiceRouter";
import { Router } from "express";
import { HelloWorldService } from "./restApi/HelloWorldService";
import { BaseService } from "./BaseService";

export class ServiceRouterImpl implements ServiceRouter {

    private router: Router;

    defineRoutes(router: Router) {
        this.router = router;
        this.addRequestFor('/helloWorld', new HelloWorldService());
    }

    private addRequestFor(endpoint: string, service: BaseService) {
        this.router.get(endpoint, (req, res) => service.get(req, res));
        this.router.post(endpoint, (req, res) => service.post(req, res));
        this.router.put(endpoint, (req, res) => service.put(req, res));
        this.router.delete(endpoint, (req, res) => service.put(req, res));
    }
}