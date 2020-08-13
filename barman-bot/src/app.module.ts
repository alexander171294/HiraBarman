import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseCFG } from './environment/database';
import { CoreService } from './core/core.service';
import { Commands } from './database/commands/commands.entity';
import { CommandsModule } from './database/commands/commands.module';
import { Variable } from './database/variables/variable.entity';
import { VariablesModule } from './database/variables/commands.module';
import { ChatController } from './controllers/chat/chat.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseCFG.host,
      port: databaseCFG.port,
      username: databaseCFG.user,
      password: databaseCFG.password,
      database: databaseCFG.name,
      entities: [
        Commands,
        Variable
      ],
      // synchronize: true,
      autoLoadEntities: true,
    }),
    CommandsModule,
    VariablesModule
  ],
  controllers: [
    ChatController
  ],
  providers: [
    CoreService
  ],
})
export class AppModule {}
