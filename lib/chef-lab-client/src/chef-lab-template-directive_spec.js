/* global angular,beforeEach,describe,expect,inject */

describe('chefLabTemplate directive', function () {
  var element, scope;

  beforeEach(module('chefLabClient'));

  beforeEach(inject(function ($rootScope, $compile) {
    element = angular.element(
      '<div data-chef-lab-template data-type=test>' +
        '{{user}}:{{password}}@{{address}} {{other}}' +
      '</div>'
    );

    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));

  describe('with no data', function () {
    it('leaves things with curly braces', inject(function ($compile, $rootScope) {
      expect(element.text()).toBe('{{user}}:{{password}}@{{address}} ');
    }));
  });

  describe('when receiving an event with empty data', function () {
    beforeEach(inject(function ($compile, $rootScope) {
      $rootScope.$emit('test', {})
    }));

    it('leaves things with curly braces', inject(function ($compile, $rootScope) {
      expect(element.text()).toBe('{{user}}:{{password}}@{{address}} ');
    }));
  });

  describe('when receiving an with valid data', function () {
    beforeEach(inject(function ($compile, $rootScope) {
      $rootScope.$emit('test', { user: 'testuser',
                                 password: 'testpass',
                                 address: '127.0.0.1' })
    }));

    it('leaves show the data', inject(function ($compile, $rootScope) {
      expect(element.text()).toBe('testuser:testpass@127.0.0.1 ');
    }));
  });
});
