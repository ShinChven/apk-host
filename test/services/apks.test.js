const assert = require('assert');
const app = require('../../src/app');

describe('\'apks\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/apks');

    assert.ok(service, 'Registered the service');
  });
});
