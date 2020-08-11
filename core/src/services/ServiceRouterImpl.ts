import { ServiceRouter } from "./ServiceRouter";
import { Router } from "express";
import { HelloWorldService } from "./restApi/HelloWorldService";
import { BaseService } from "./BaseService";
import { CommandService } from "./restApi/CommandsService";

export class ServiceRouterImpl implements ServiceRouter {

    private router: Router;

    defineRoutes(router: Router) {
        this.router = router;
        this.addRequestFor('/helloWorld', new HelloWorldService());
        this.addRequestFor('/commands', new CommandService());
        this.router.all('/', (req, res) => {
            console.log('REQRES', req,res);
            res.send('OK');
        });
    }

    private addRequestFor(endpoint: string, service: BaseService) {
        console.log('Registering endpoint: ' + endpoint);
        this.router.get(endpoint, (req, res) => service.get(req, res));
        this.router.get(endpoint + '/:id', (req, res) => service.getOne(req, res));
        this.router.post(endpoint, (req, res) => service.post(req, res));
        this.router.put(endpoint + '/:id', (req, res) => service.put(req, res));
        this.router.delete(endpoint + '/:id', (req, res) => service.put(req, res));
    }
}