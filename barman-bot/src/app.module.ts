import { QuotesController } from './controllers/quotes/quotes.controller';
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
import { QuotesModule } from './database/quotes/quotes.module';
import { HistoryModule } from './database/history/history.module';
import { HistoryController } from './controllers/history/history.controller';

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
    VariablesModule,
    QuotesModule,
    HistoryModule
  ],
  controllers: [
    ChatController,
    VariablesController,
    CommandsController,
    SettingsController,
    HistoryController,
    QuotesController
  ],
  providers: [
    CoreService
  ],
})
export class AppModule {}
