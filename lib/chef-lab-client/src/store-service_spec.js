/* global beforeEach, expect, inject */

describe('store service', function () {

  beforeEach(module('chefLabClient'));
  beforeEach(function () { localStorage.clear() });

  describe('visitorId', function () {
    it('is a function', inject(function (store) {
      expect(typeof store.visitorId).toBe('function');
    }));

    it('returns an string', inject(function (store) {
      expect(typeof store.visitorId()).toBe('string');
    }));
  });
});
