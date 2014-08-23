/* global angular, beforeEach, describe, expect, inject, spyOn */

describe('chefLabProvisioner directive', function () {
  var element, scope;

  beforeEach(module('chefLabClient'));

  beforeEach(function () { localStorage.clear(); });

  beforeEach(inject(function ($rootScope, $compile) {
    element = angular.element(
      '<div data-chef-lab-provisioner data-type=test></div>'
    );
    scope = $rootScope;
    $compile(element)(scope);
  }));

  describe('machine model', function () {
    it('it gets the machine data from the scope events', inject(function ($compile, $timeout, $rootScope) {
      var machine = { type: 'test', status: 'pending', user: 'testuser' };
      $rootScope.$emit('machine:change', machine);
      $timeout(function () { expect(scope.machine).toEqual(machine); });
    }));
  });

  describe('fetch', function () {
    it('triggers a machine:change event with the waiting state', inject(function ($rootScope) {
      spyOn(scope, '$emit');
      scope.machine = { type: 'test' };
      scope.fetch()

      expect(scope.$emit).toHaveBeenCalledWith('machine:change',
        { type: 'test', status: 'waiting' });
    }));
  });
});
