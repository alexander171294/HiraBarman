import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Variable } from "./variable.entity";
import { Repository } from "typeorm";

@Injectable()
export class VariableAdapter {

    constructor(
        @InjectRepository(Variable)
        private variableRepository: Repository<Variable>,
    ) { }

    async findVariable(channel: string, username: string, varname: string): Promise<string> {
        let out = await this.variableRepository.find({
            channel,
            username,
            varname
        }).catch((err) => {
            console.error('Error getting variable: ', varname, channel, username, err);
        });
        if (!out || out.length == 0) {
            const vars = new Variable();
            vars.channel = channel;
            vars.username = username;
            vars.varname = varname;
            this.variableRepository.insert(vars);
            return '';
        }
        return out[0].rawvalue;
    }

    async findVariableAsNumber(channel: string, userName: string, varName: string): Promise<number> {
        let resRaw = await this.findVariable(channel, userName, varName);
        if(resRaw === '') {
            resRaw = '0';
        }
        return parseInt(resRaw, 10);
    }

    async incrementVariable(channel: string, userName: string, varName: string): Promise<string> {
        let result = await this.findVariableAsNumber(channel, userName, varName);
        result++;
        this.updateVariable(channel, userName, varName, result);
        return result.toString();
    }

    async decrementVariable(channel: string, userName: string, varName: string): Promise<string> {
        let result = await this.findVariableAsNumber(channel, userName, varName);
        result--;
        this.updateVariable(channel, userName, varName, result);
        return result.toString();
    }

    async updateVariable(channel: string, username: string, varname: string, result: any) {
        return this.variableRepository.update({
            channel,
            username,
            varname
        }, {
            rawvalue: result
        }).catch(
            (err) => {
                console.error('Error updating variable: ', varname, channel, username, err);
            }
        );
    }

    public getRepository(): Repository<Variable> {
        return this.variableRepository;
    }

    async getUsersOfVariables() {
        const dbresp = await this.variableRepository.createQueryBuilder("commands").distinctOn(['username']).getMany();
        const out = [];
        dbresp.forEach(command => {
            out.push(command.username);
        })
        return out;
    }

    async getChannelsOfVariables() {
        const dbresp = await this.variableRepository.createQueryBuilder("commands").distinctOn(['channel']).getMany();
        const out = [];
        dbresp.forEach(command => {
            out.push(command.channel);
        })
        return out;
    }
}