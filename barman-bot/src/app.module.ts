import { SettingsController } from './controllers/settings/settings.controller';
import { VariablesController } from './controllers/variables/variables.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseCFG } from './environment/database';
import { CoreService } from './core/core.service';
import { Commands } from './database/commands/commands.entity';
import { CommandsModule } from './database/commands/commands.module';
import { Variable } from './database/variables/variable.entity';
import { VariablesModule } from './database/variables/variables.module';
import { ChatController } from './controllers/chat/chat.controller';
import { CommandsController } from './controllers/commands/commands.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseCFG.host,
      port: databaseCFG.port as number,
      username: databaseCFG.user,
      password: databaseCFG.password,
      database: databaseCFG.name,
      entities: [
        Commands,
        Variable
      ],
      synchronize: databaseCFG.createSchema,
      autoLoadEntities: true,
    }),
    CommandsModule,
    VariablesModule
  ],
  controllers: [
    ChatController,
    VariablesController,
    CommandsController,
    SettingsController
  ],
  providers: [
    CoreService
  ],
})
export class AppModule {}
