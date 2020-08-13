import * as express from 'express';
import * as irc from 'irc';
import { CoreImpl } from './core/CoreImpl';
import { CoreHandler } from './core/Core';
import { ServiceRouter } from './services/ServiceRouter';
import { ServiceRouterImpl } from './services/ServiceRouterImpl';
import { botConfig } from './env/botConfig';
import { DBHandler } from './database/DbHandler';
var bodyParser = require('body-parser');

export class App {
    private express;
    private client;
    private router: express.Router;

    private services: ServiceRouter[];
    private cores: CoreHandler[];

    constructor() {
        this.express = express();
        this.express.use(bodyParser.json());
        DBHandler.connectDB();
        this.services = [
            new ServiceRouterImpl()
        ];
        this.cores = [
            new CoreImpl()
        ];
        this.client = new irc.Client(botConfig.server, botConfig.botName, {
            channels: botConfig.channels
        });
        this.cores.forEach(core => {
            core.attachEvents(this.client);
        });
        this.services.forEach(service => {
            service.defineRoutes(this.express);
        });
    }

    listen(port) {
        return new Promise((res, rej) => {
            this.express.listen(port, (err) => {
                if(err) {
                    rej(err);
                } else {
                    res();
                }
            });
        })
    }
}

export default new App();