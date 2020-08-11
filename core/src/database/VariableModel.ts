import { BaseModel } from "./BaseModel";

export class Variable {
    public id: number;
    public channel: string;
    public userName: string;
    public varName: string;
    public rawVal: string;
}

export class VariableModel extends BaseModel {

    private static instance: VariableModel;
    private constructor() { super(); }
    public static getInstance(): VariableModel { 
        if (!this.instance) {
            this.instance = new VariableModel();
        }
        return this.instance;
    }

    async findVariable(channel: string, userName: string, varName: string) {
        let out = await this.db.query('SELECT id, rawVal FROM variables WHERE channel = $1 AND userName = $2 AND varName = $3', [
            channel,
            userName,
            varName
        ]).catch(
            (err) => {
                console.error('Error getting variable: ', varName, channel, userName, err);
            }
        );
        if (!out) {
            await this.db.query('INSERT INTO variables(channel, userName, varName) VALUES ($1, $2, $3)', [channel, userName, varName]).catch(
                (err) => {
                    console.error('Error creating variable: ', varName, channel, userName, err);
                }
            );
            return '';
        }
        return out.rows[0];
    }

    async incrementVariable(channel: string, userName: string, varName: string) {
        let result = parseInt(await this.findVariable(channel, userName, varName), 10);
        result++;
        this.updateVariable(channel, userName, varName, result);
        return result;
    }

    async decrementVariable(channel: string, userName: string, varName: string) {
        let result = parseInt(await this.findVariable(channel, userName, varName), 10);
        result--;
        this.updateVariable(channel, userName, varName, result);
        return result;
    }

    async updateVariable(channel: string, userName: string, varName: string, result: any) {
        return await this.db.query('UPDATE variables SET rawVal = $1 WHERE channel = $2 AND userName = $3 AND varName = $4', [
            result,
            channel,
            userName,
            varName
        ]).catch(
            (err) => {
                console.error('Error updating variable: ', varName, channel, userName, err);
            }
        );
    }
}