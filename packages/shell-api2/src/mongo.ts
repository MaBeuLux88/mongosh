import {
  ServiceProvider,
  // Document,
  // DatabaseOptions,
  // Cursor as ServiceProviderCursor
} from '@mongosh/service-provider-core';
import {
  shellApiClassDefault,
  // returnsPromise,
  // returnType,
  // hasAsyncChild,
  // ShellApiClass
} from './main';
import Database from './database';
import InternalState from './internal-state';
import { CommandResult } from './result';
import { MongoshInternalError, MongoshInvalidInputError } from '@mongosh/errors';

@shellApiClassDefault
export default class Mongo {
  public serviceProvider: ServiceProvider;
  public databases: any;
  public internalState: InternalState;

  constructor(internalState, options, host?, fleOptions?) {
    this.internalState = internalState;
    this.databases = {};
  }

  getDB(db): Database {
    if (!(db in this.databases)) {
      this.databases[db] = new Database(this, db);
    }
    this.internalState.messageBus.emit( 'mongosh:getDB', { db });
    return this.databases[db];
  }

  use(db): any {
    if (!(db in this.databases)) {
      this.databases[db] = new Database(this, db);
    }
    this.internalState.messageBus.emit( 'mongosh:use', { db });
    this.internalState.context.db = this.databases[db];

    return `switched to db ${db}`;
  }

  async show(arg): Promise<CommandResult> {
    this.internalState.messageBus.emit( 'mongosh:show', { method: `show ${arg}` });

    switch (arg) {
      case 'databases':
      case 'dbs':
        const result = await this.serviceProvider.listDatabases('admin');
        if (!('databases' in result)) {
          const err = new MongoshInternalError('Got invalid result from "listDatabases"');
          this.internalState.messageBus.emit('mongosh:error', err);
          throw err;
        }

        return new CommandResult('ShowDatabasesResult', result.databases);
      case 'collections':
      case 'tables':
        const collectionNames = await this.internalState.currentDb.getCollectionNames();
        return new CommandResult('ShowCollectionsResult', collectionNames);
      default:
        const validArguments = [
          'databases',
          'dbs',
          'collections',
          'tables'
        ];

        const err = new MongoshInvalidInputError(
          `'${arg}' is not a valid argument for "show".\nValid arguments are: ${validArguments.join(', ')}`
        );

        this.internalState.messageBus.emit('mongosh:error', err);
        throw err;
    }
  }
}
