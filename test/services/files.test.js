const assert = require('assert');
const app = require('../../src/app');

describe('\'files\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/files');

    assert.ok(service, 'Registered the service');
  });
});
