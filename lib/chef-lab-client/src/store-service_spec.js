/* global beforeEach, expect, inject */

describe('store service', function () {

  beforeEach(module('chefLabClient'));
  beforeEach(function () { localStorage.clear() });

  describe('visitor', function () {

    it('is an object', inject(function (store) {
      expect(typeof store.visitor.get()).toBe('object');
    }));

    it('has an ID', inject(function (store) {
      expect(typeof store.visitor.get().id).toBe('string');
    }));
    
    it('has preferences', inject(function (store) {
      expect(typeof store.visitor.get().prefs).toBe('object');
    }));
  });
});
