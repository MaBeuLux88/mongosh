import Mongo from './mongo';
import {
  shellApiClassDefault,
  hasAsyncChild,
  ShellApiClass,
} from './main';

import {
  Document
} from '@mongosh/service-provider-core';
import { MongoshUnimplementedError } from '@mongosh/errors';

@shellApiClassDefault
@hasAsyncChild
export default class Shard extends ShellApiClass {
  mongo: Mongo;

  constructor(mongo) {
    super();
    this.mongo = mongo;
    const proxy = new Proxy(this, {
      get: (obj, prop): any => {
        if (!(prop in obj)) {
          throw new MongoshUnimplementedError('sh not currently supported');
        }
        return obj[prop];
      }
    });
    return proxy;
  }

  /**
   * Internal helper for emitting Shard API call events.
   *
   * @param methodName
   * @param methodArguments
   * @private
   */
  private _emitShardApiCall(methodName: string, methodArguments: Document = {}): void {
    this.mongo.internalState.emitApiCall({
      method: methodName,
      class: 'Shard',
      arguments: methodArguments
    });
  }
}
