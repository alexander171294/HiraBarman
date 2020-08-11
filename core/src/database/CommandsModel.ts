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
        let target = '';
        let params = [];
        if (filters.targetChannel) {
            target = '(targetChannel is null' + target + ' OR targetChannel = $1)';
            params.push(filters.targetChannel);
        }
        if(filters.fromUser) {
            if (target != '') {
                target += ' AND ';
            }
            const variable = target != '' ? '$2' : '$1';
            target += '(fromUser is null OR fromUser = ' + variable + ')';
            params.push(filters.fromUser);
        }
        if(target != '') {
            target = ' WHERE ' + target;
        }
        // console.log('Searching target ', target, params);
        const query = 'SELECT * FROM commands' + target;
        const res = await this.db.query(query, params).catch(
                        (err) => {
                            console.error('Error querying commands: ', query, filters, err);
                        }
                      );
        return res ? res.rows : [];
    }

    public async findCommand(id_command: number): Promise<Command[]> {
        const res = await this.db.query('SELECT command, response, targetChannel, fromUser FROM commands WHERE id_command = $1',
                      [id_command]).catch(
                        (err) => {
                            console.error('Error querying commands: ', id_command, err);
                        }
                      );
        return res ? res.rows : [];
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