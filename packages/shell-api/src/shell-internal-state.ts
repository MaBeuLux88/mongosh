import {
  AggregationCursor,
  CursorIterationResult,
  Cursor,
  Help,
  Database,
  Mongo,
  ReplicaSet,
  Shard,
  signatures,
  ShellBson,
  toIterator,
  ReplPlatform
} from './index';
import { EventEmitter } from 'events';
import { DatabaseOptions, Document, ServiceProvider } from '@mongosh/service-provider-core';
import { MongoshInvalidInputError, MongoshUnimplementedError } from '@mongosh/errors';
import AsyncWriter from '@mongosh/async-rewriter';

/**
 * Anything to do with the internal shell state is stored here.
 */
export default class ShellInternalState {
  public currentCursor: Cursor | AggregationCursor;
  public currentDb: Database;
  public messageBus: EventEmitter;
  public asyncWriter: AsyncWriter;
  public initialServiceProvider: ServiceProvider; // the initial service provider
  public uri: string;
  public platform: ReplPlatform;
  public connectionInfo: any;
  constructor(platform: ReplPlatform, initialServiceProvider: ServiceProvider, messageBus: any) {
    this.initialServiceProvider = initialServiceProvider;
    this.platform = platform;
    this.messageBus = messageBus;
    this.asyncWriter = new AsyncWriter(signatures);
    const mongo = new Mongo(this);
    this.currentCursor = null;
    this.currentDb = mongo.getDB('test'); // TODO: set to CLI arg
  }

  async fetchConnectionInfo(): Promise<void> {
    this.connectionInfo = await this.currentDb.mongo.serviceProvider.getConnectionInfo();
    this.messageBus.emit('mongosh:connect', this.connectionInfo.extraInfo);
  }

  // TODO: do we need to close all Mongos ever made?
  close(p): void {
    try {
      this.currentDb.mongo.serviceProvider.close(p);
      // eslint-disable-next-line no-empty
    } catch (e) {
    }
  }

  use(db): any {
    return this.currentDb.mongo.use(db);
  }
  show(arg): any {
    return this.currentDb.mongo.show(arg);
  }
  async it(): Promise<any> {
    if (!this.currentCursor) {
      // TODO: warn here
      return new CursorIterationResult();
    }
    return await this.currentCursor._it();
  }
  public help(): Help {
    this.messageBus.emit('mongosh:help');
    return new Help({
      help: 'shell-api.help.description',
      docs: 'https://docs.mongodb.com/manual/reference/method',
      attr: [
        {
          name: 'use',
          description: 'shell-api.help.help.use'
        },
        {
          name: 'it',
          description: 'shell-api.help.help.it'
        },
        {
          name: 'show databases',
          description: 'shell-api.help.help.show-databases'
        },
        {
          name: 'show collections',
          description: 'shell-api.help.help.show-collections'
        },
        {
          name: '.exit',
          description: 'shell-api.help.help.exit'
        }
      ]
    });
  }

  /**
   * Prepare a `contextObject` as global context and set it as context
   * Add each attribute to the AsyncWriter also.
   *
   * The `contextObject` is prepared so that it can be used as global object
   * for the repl evaluationi.
   *
   * @note The `contextObject` is mutated, it will retain all of its existing
   * properties but also have the global shell api objects and functions.
   *
   * @param {Object} contextObject - contextObject an object used as global context.
   */
  setCtx(contextObject: any): void {
    // Add API methods for VSCode and scripts
    contextObject.use = this.use.bind(this);
    contextObject.show = this.show.bind(this);
    contextObject.it = this.it.bind(this);
    contextObject.help = this.help.bind(this);
    contextObject.toIterator = toIterator;
    Object.assign(contextObject, ShellBson);

    // Add global shell objects
    this.asyncWriter.symbols.initializeApiObjects({
      db: signatures.Database,
      rs: signatures.ReplicaSet,
      sh: signatures.Shard,
      Mongo: signatures.Mongo
    });

    Object.defineProperty(contextObject, 'db', {
      set: (newDb: any) => {
        if (newDb.shellApiType && newDb.shellApiType() !== 'Database') {
          throw new MongoshInvalidInputError('Cannot reassign \'db\' to non-Database type');
        }
        this.currentDb = newDb;
        contextObject.rs = new ReplicaSet(this.currentDb.mongo);
        contextObject.sh = new Shard(this.currentDb.mongo);
        return newDb;
      },
      get: () => {
        return this.currentDb;
      }
    });

    contextObject.Mongo = async(uri?, options?): Promise<Mongo> => {
      if (this.platform === ReplPlatform.Browser || this.platform === ReplPlatform.Compass) {
        throw new MongoshUnimplementedError('new Mongo connection are not supported for current platform');
      }
      const mongo = new Mongo(this, uri, options);
      await mongo.connect();
      return mongo;
    };

    // Update mapper and log
    this.messageBus.emit(
      'mongosh:setCtx',
      { method: 'setCtx', arguments: { db: contextObject.db } }
    );
  }

  public emitApiCall(event: {
    method: string;
    class: string;
    arguments: Document;
    [otherProps: string]: any;
  }): void {
    this.messageBus.emit('mongosh:api-call', event);
  }

  /**
   * Helper method to adapt aggregation pipeline options.
   * This is here so that it's not visible to the user.
   *
   * @param options
   */
  public adaptAggregateOptions(options: any = {}): {
    providerOptions: Document;
    dbOptions: DatabaseOptions;
    explain: boolean;
  } {
    const providerOptions = { ...options };

    const dbOptions: DatabaseOptions = {};
    let explain = false;

    if ('readConcern' in providerOptions) {
      dbOptions.readConcern = options.readConcern;
      delete providerOptions.readConcern;
    }

    if ('writeConcern' in providerOptions) {
      Object.assign(dbOptions, options.writeConcern);
      delete providerOptions.writeConcern;
    }

    if ('explain' in providerOptions) {
      explain = providerOptions.explain;
      delete providerOptions.explain;
    }

    return { providerOptions, dbOptions, explain };
  }

  public validateExplainableVerbosity(verbosity: string): void {
    const allowedVerbosity = [
      'queryPlanner',
      'executionStats',
      'allPlansExecution'
    ];

    if (!allowedVerbosity.includes(verbosity)) {
      throw new MongoshInvalidInputError(
        `verbosity can only be one of ${allowedVerbosity.join(', ')}. Received ${verbosity}.`
      );
    }
  }

  public checkUndefinedUpdate(...args: any) {
    if (args.some(a => a === undefined)) {
      throw new MongoshInvalidInputError('Cannot pass an undefined argument to a write command');
    }
  }
}

