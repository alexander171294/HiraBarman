import { BaseModel } from "./BaseModel";

export class Command {
    id_command?: number;
    targetChannel?: string;
    fromUser?: string;
    command: string;
    response: string;
}

export class FiltersOpt {
    targetChannel?: string;
    fromUser?: string;
}

export class CommandsModel extends BaseModel {
    private static instance: CommandsModel;
    private constructor() { super(); }
    public static getInstance(): CommandsModel { 
        if (!this.instance) {
            this.instance = new CommandsModel();
        }
        return this.instance;
    }
    
    public async getCommands(filters: FiltersOpt): Promise<Command[]> {
        const res = await this.db.query('SELECT command, response FROM commands WHERE (targetChannel = null OR targetChannel = $1) AND (fromUser = null OR fromUser = $2)',
                      [filters.targetChannel, filters.fromUser]).catch(
                        (err) => {
                            console.error('Error querying commands: ', filters, err);
                        }
                      );
        return res.rows;
    }

    public async findCommand(id_command: number): Promise<Command[]> {
        const res = await this.db.query('SELECT command, response, targetChannel, fromUser FROM commands WHERE id_command = $1',
                      [id_command]).catch(
                        (err) => {
                            console.error('Error querying commands: ', id_command, err);
                        }
                      );
        return res.rows;
    }

    public async addComand(command: Command) {
        return await this.db.query('INSERT INTO commands(targetChannel, fromUser, command, response) VALUES($1, $2, $3, $4)', [
            command.response,
            command.fromUser,
            command.command,
            command.response
        ]).catch(
            (err) => {
                console.error('Error inserting commands: ', command, err);
            }
        );
    }

    public async editCommand(command: Command) {
        return await this.db.query('UPDATE commands SET targetChannel = $1, fromUser = $2, command = $3, response = $4 WHERE id_command = $5', [
            command.response,
            command.fromUser,
            command.command,
            command.response,
            command.id_command
        ]).catch(
            (err) => {
                console.error('Error updating commands: ', command, err);
            }
        ); 
    }

    public async delete(id_command: number) {
        return await this.db.query('DELETE FROM commands  WHERE id_command = $1', [id_command]);
    }

}