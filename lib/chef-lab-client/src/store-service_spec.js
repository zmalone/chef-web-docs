/* global beforeEach, expect, inject */

describe('store service', function () {
  beforeEach(module('chefLabClient'));

  beforeEach(function () { localStorage.clear() });

  describe('getMachine', function () {
    it('is a function', inject(function (store) {
      expect(typeof store.getMachine).toBe('function');
    }));

    it('returns an object', inject(function (store) {
      expect(typeof store.getMachine()).toBe('object');
    }));

    describe('when a matching item exists in localStorage', function () {
      it('returns that item', inject(function (store) {
        var machine = { type: 'test', foo: 'bar' };
        localStorage.setItem('chefLab-machine-test', JSON.stringify(machine));

        expect(store.getMachine('test')).toEqual(machine);
      }));
    });

    describe('when no matching item exists in localStorage', function () {
      it('creates one', inject(function (store) {
        store.getMachine('test');

        expect(JSON.parse(localStorage.getItem('chefLab-machine-test'))).
          toEqual({ type: 'test' });
      }));
    });
  });

  describe('machine:change event', function () {
    describe('when the machine does not exist', function () {
      it('creates it', inject(function (store, $rootScope, $timeout) {
        var machine = { type: 'test', foo: 'bar' };
        $rootScope.$emit('machine:change', machine);

        expect(store.getMachine('test')).toEqual(machine);
      }));
    });

    describe('when the machine exists', function () {
      it('overwrites its data', inject(function (store, $rootScope) {
        var oldMachine = { type: 'test', foo: 'bar' },
            newMachine = { type: 'test', baz: 'quux' };
        localStorage.setItem('chefLab-machine-test', JSON.stringify(oldMachine));
        $rootScope.$emit('machine:change', newMachine);

        expect(store.getMachine('test')).toEqual(newMachine);
      }));
    });
  });
});
