import sinon from 'sinon';
import Mapper from '../../mapper/lib';
import { Collection, Database, Explainable } from './shell-api';
import * as signatures from './shell-api-signatures';
import { expect } from 'chai';

/**
 * Test that an explainable method proxies the respective Mapper method correctly,
 * with the right arguments and returning the right result.
 *
 * It ensures:
 * - that the method is defined in the shell api and that is meant to be a function
 * - that the mapper method to be proxied to exists
 * - that the mapper method is called with an explainable as first argument and with
 *   the rest of invokation arguments.
 * - that the result of mapper invokation is returned.
 *
 * @param {String} name - the name of the method to invoke
 */
function testWrappedMethod(name: string): void {
  const attribute = signatures.Explainable.attributes[name];
  expect(attribute).to.exist;
  expect(attribute.type).to.equal('function');

  const mock = sinon.mock();
  const mapper: Mapper = sinon.createStubInstance(Mapper, {
    [`explainable_${name}`]: mock
  });

  const args = [1, 2, 3];
  const retVal = {};

  const database = new Database('db1');
  const collection = new Collection(mapper, database, 'coll1');
  const explainable = new Explainable(mapper, collection);

  mock.withArgs(explainable, ...args).returns(retVal);

  const result = explainable[name](...args);
  mock.verify();

  expect(result).to.equal(retVal);
}

describe('Explainable', () => {
  [
    'getCollection',
    'getVerbosity',
    'setVerbosity'
  ].forEach((methodName) => {
    describe(`#${methodName}`, () => {
      it(`wraps mapper.collection_${methodName}`, () => {
        testWrappedMethod(methodName);
      });
    });
  });
});
