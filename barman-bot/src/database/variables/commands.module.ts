import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VariableAdapter } from "./variable.adapter";
import { Variable } from "./variable.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Variable])],
    controllers: [

    ],
    providers: [
        VariableAdapter
    ],
    exports: [
        VariableAdapter
    ],
})
export class VariablesModule { }