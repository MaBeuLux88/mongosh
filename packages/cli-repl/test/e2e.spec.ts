import { expect } from 'chai';
import { MongoClient } from 'mongodb';
import { eventually, startShell, killOpenShells } from './helpers';

describe('e2e', function() {
  before(require('mongodb-runner/mocha/before')({ port: 27018, timeout: 60000 }));
  after(require('mongodb-runner/mocha/after')({ port: 27018 }));

  afterEach(() => killOpenShells());

  describe('--version', () => {
    it('shows version', async() => {
      const shell = startShell('--version');
      await eventually(() => {
        expect(shell.stdio.stderr).to.be.empty;
        expect(shell.stdio.stdout).to.contain(
          require('../package.json').version
        );
      });
    });
  });

  describe('with connection string', () => {
    let db;
    let client;
    let shell;
    let dbName;

    beforeEach(async() => {
      dbName = `test-${Date.now()}`;
      const connectionString = `mongodb://localhost:27018/${dbName}`;

      shell = startShell(connectionString);
      client = await (MongoClient as any).connect(
        connectionString,
        { useNewUrlParser: true }
      );

      db = client.db(dbName);
    });

    afterEach(async() => {
      await db.dropDatabase();

      client.close();
    });

    it.skip('connects to the right database', async() => {
      shell.stdio.stdin.write('db\n');

      await eventually(() => {
        expect(shell.stdio.stderr).to.be.empty;
        expect(shell.stdio.stdout).to.contain(`> ${dbName}\n`);
      });
    });

    it('throws multiline input with a single line string', async() => {
      // this is an unterminated string constant and should throw, since it does
      // not pass: https://www.ecma-international.org/ecma-262/#sec-line-terminators
      shell.stdio.stdin.write('"this is a multi\nline string"\n');

      await eventually(() => {
        expect(shell.stdio.stderr).to.exist;
      });
    });

    it('throws when a syntax error is encountered', async() => {
      shell.stdio.stdin.write('<x>\n');

      await eventually(() => {
        expect(shell.stdio.stderr).to.exist;
      });
    });

    it('does not throw for a repl await function', async() => {
      shell.stdio.stdin.write('await Promise.resolve(\'Nori-cat\');');

      await eventually(() => {
        expect(shell.stdio.stderr).to.be.equal('');
      });
    });

    it('runs an unterminated function', async() => {
      shell.stdio.stdin.write('function x () {\nconsole.log(\'y\')\n }\n');

      await eventually(() => {
        expect(shell.stdio.stderr).to.be.empty;
      });
    });

    it('runs an unterminated function', async() => {
      shell.stdio.stdin.write('function x () {\n');

      await eventually(() => {
        expect(shell.stdio.stderr).to.be.empty;
      });
    });

    it('runs help command', async() => {
      shell.stdio.stdin.write('help\n');

      await eventually(() => {
        expect(shell.stdio.stderr).to.be.empty;
        expect(shell.stdio.stdout).to.contain('Shell Help');
      });
    });

    it('allows to find documents', async() => {
      shell.stdio.stdin.write(`use ${dbName}\n`);

      await db.collection('test').insertMany([
        { doc: 1 },
        { doc: 2 },
        { doc: 3 }
      ]);

      shell.stdio.stdin.write('db.test.find()\n');

      await eventually(() => {
        expect(shell.stdio.stderr).to.be.empty;
        expect(shell.stdio.stdout).to.contain('doc: 1');
        expect(shell.stdio.stdout).to.contain('doc: 2');
        expect(shell.stdio.stdout).to.contain('doc: 3');
      });
    });
  });
});
