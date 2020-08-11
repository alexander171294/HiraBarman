import * as express from 'express';
import * as irc from 'irc';
import { CoreImpl } from './core/CoreImpl';
import { CoreHandler } from './core/Core';
import { ServiceRouter } from './services/ServiceRouter';
import { ServiceRouterImpl } from './services/ServiceRouterImpl';
import { botConfig } from './env/botConfig';
import { DBHandler } from './database/DbHandler';

export class App {
    private express;
    private client;
    private router: express.Router;

    private services: ServiceRouter[] = [
        new ServiceRouterImpl()
    ];
    private cores: CoreHandler[] = [
        new CoreImpl()
    ];

    constructor() {
        this.express = express();
        DBHandler.connectDB();
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