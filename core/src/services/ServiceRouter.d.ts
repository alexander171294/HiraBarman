import { Router } from "express";

export interface ServiceRouter {
    defineRoutes(router: Router);
}
