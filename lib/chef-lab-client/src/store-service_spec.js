/* global beforeEach, expect, inject */

describe('store service', function () {

  beforeEach(module('chefLabClient'));
  beforeEach(function () { localStorage.clear() });

  describe('visitor', function () {

    it('is an object', inject(function (store) {
      expect(typeof store.visitor).toBe('object');
    }));

    it('has an ID', inject(function (store) {
      expect(typeof store.visitor.id).toBe('string');
    }));
    
    it('has preferences', inject(function (store) {
      expect(typeof store.visitor.prefs).toBe('object');
    }));
  });
});
