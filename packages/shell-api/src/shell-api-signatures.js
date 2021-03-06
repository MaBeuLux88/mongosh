const unknown = {
  type: 'unknown',
  attributes: {}
};
const AggregationCursor = {
  type: 'AggregationCursor',
  hasAsyncChild: true,
  attributes: {
    close: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    forEach: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    hasNext: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    isClosed: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    isExhausted: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    itcount: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    map: { type: 'function', returnsPromise: false, returnType: 'AggregationCursor', serverVersions: ['0.0.0', '4.4.0'] },
    next: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    toArray: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    explain: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] }
  }
};
const BulkWriteResult = {
  type: 'BulkWriteResult',
  hasAsyncChild: false,
  attributes: {

  }
};
const Collection = {
  type: 'Collection',
  hasAsyncChild: true,
  attributes: {
    aggregate: { type: 'function', returnsPromise: true, returnType: 'AggregationCursor', serverVersions: ['0.0.0', '4.4.0'] },
    bulkWrite: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    countDocuments: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['4.0.3', '4.4.0'] },
    count: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    deleteMany: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    deleteOne: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    distinct: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    estimatedDocumentCount: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['4.0.3', '4.4.0'] },
    find: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    findAndModify: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    findOne: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    findOneAndDelete: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    findOneAndReplace: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    findOneAndUpdate: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    insert: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    insertMany: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    insertOne: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    isCapped: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    remove: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    save: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    replaceOne: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    update: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    updateMany: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    updateOne: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    convertToCapped: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    createIndexes: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    createIndex: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    ensureIndex: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    getIndexes: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    getIndexSpecs: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    getIndexKeys: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.2.0', '4.4.0'] },
    getIndices: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    dropIndexes: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    dropIndex: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    reIndex: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    totalIndexSize: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    getDB: { type: 'function', returnsPromise: false, returnType: 'Database', serverVersions: ['0.0.0', '4.4.0'] },
    stats: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    dataSize: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    storageSize: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    totalSize: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    drop: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    getFullName: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    getName: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    exists: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    renameCollection: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    runCommand: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    explain: { type: 'function', returnsPromise: false, returnType: 'Explainable', serverVersions: ['0.0.0', '4.4.0'] }
  }
};
const CommandResult = {
  type: 'CommandResult',
  hasAsyncChild: false,
  attributes: {

  }
};
const Cursor = {
  type: 'Cursor',
  hasAsyncChild: true,
  attributes: {
    addOption: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '3.2.0'] },
    allowPartialResults: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    arrayAccess: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    batchSize: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    clone: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    close: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    collation: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['3.4.0', '4.4.0'] },
    comment: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['3.2.0', '4.4.0'] },
    count: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    explain: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    forEach: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    hasNext: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    hint: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    isClosed: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    isExhausted: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    itcount: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    limit: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    map: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    max: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    maxTimeMS: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    min: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    next: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    noCursorTimeout: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    oplogReplay: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    projection: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    readPref: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    returnKey: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['3.2.0', '4.4.0'] },
    size: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    skip: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    sort: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    tailable: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['3.2.0', '4.4.0'] },
    toArray: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] }
  }
};
const Database = {
  type: 'Database',
  hasAsyncChild: true,
  attributes: {
    getCollectionNames: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    getCollectionInfos: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.0.0', '4.4.0'] },
    runCommand: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    adminCommand: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['3.4.0', '4.4.0'] },
    aggregate: { type: 'function', returnsPromise: true, returnType: 'AggregationCursor', serverVersions: ['0.0.0', '4.4.0'] },
    getSiblingDB: { type: 'function', returnsPromise: false, returnType: 'Database', serverVersions: ['0.0.0', '4.4.0'] },
    getCollection: { type: 'function', returnsPromise: false, returnType: 'Collection', serverVersions: ['0.0.0', '4.4.0'] },
    dropDatabase: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] }
  }
};
const DeleteResult = {
  type: 'DeleteResult',
  hasAsyncChild: false,
  attributes: {

  }
};
const Explainable = {
  type: 'Explainable',
  hasAsyncChild: false,
  attributes: {
    getCollection: { type: 'function', returnsPromise: false, returnType: 'Collection', serverVersions: ['0.0.0', '4.4.0'] },
    getVerbosity: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    setVerbosity: { type: 'function', returnsPromise: false, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] },
    find: { type: 'function', returnsPromise: false, returnType: 'Cursor', serverVersions: ['0.0.0', '4.4.0'] },
    aggregate: { type: 'function', returnsPromise: true, returnType: 'unknown', serverVersions: ['0.0.0', '4.4.0'] }
  }
};
const InsertManyResult = {
  type: 'InsertManyResult',
  hasAsyncChild: false,
  attributes: {

  }
};
const InsertOneResult = {
  type: 'InsertOneResult',
  hasAsyncChild: false,
  attributes: {

  }
};
const ReplicaSet = {
  type: 'ReplicaSet',
  hasAsyncChild: false,
  attributes: {

  }
};
const Shard = {
  type: 'Shard',
  hasAsyncChild: false,
  attributes: {

  }
};
const UpdateResult = {
  type: 'UpdateResult',
  hasAsyncChild: false,
  attributes: {

  }
};
export {
  unknown,
  AggregationCursor,
  BulkWriteResult,
  Collection,
  CommandResult,
  Cursor,
  Database,
  DeleteResult,
  Explainable,
  InsertManyResult,
  InsertOneResult,
  ReplicaSet,
  Shard,
  UpdateResult
};
