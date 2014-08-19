/* global angular,beforeEach,describe,expect,inject */

describe('chefLabTemplate directive', function () {
  var element, scope;

  beforeEach(module('chefLabClient'));

  describe('machine model', function () {
    beforeEach(inject(function ($rootScope, $compile) {
      element = angular.element(
        '<div data-chef-lab-provisioner data-type=test></div>'
      );
      scope = $rootScope;
      $compile(element)(scope);
      scope.$digest();
    }));

    it('it gets the machine data from the scope events', inject(function ($compile, $rootScope) {
      var machine = { status: 'pending', user: 'testuser' };
      $rootScope.$emit('test', machine);
      expect(scope.machine).toEqual(machine);
    }));
  });
});
