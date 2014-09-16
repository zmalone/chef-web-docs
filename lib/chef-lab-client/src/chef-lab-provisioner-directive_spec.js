/* global angular, beforeEach, describe, expect, inject, spyOn */

describe('chefLabProvisioner directive', function () {
  var element, scope;

  beforeEach(module('chefLabClient'));

  beforeEach(function () { localStorage.clear(); });

  beforeEach(inject(function ($rootScope, $compile) {
    element = angular.element(
      '<div data-chef-lab-provisioner data-type="test"></div>'
    );
    scope = $rootScope;
    $compile(element)(scope);
  }));
});
