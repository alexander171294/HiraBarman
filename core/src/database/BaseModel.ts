import { DBHandler } from "./DbHandler";

export class BaseModel {
    protected db;
    constructor() {
        this.db = DBHandler.getConnection();
    }
}