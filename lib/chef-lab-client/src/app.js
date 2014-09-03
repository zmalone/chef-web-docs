/* global angular */

var app = angular.module('chefLabClient', ['ngAnimate']);

app.constant('chefLabUrl', process.env.CHEF_LAB_URL || 'http://localhost:3000');

require('./chef-lab-provisioner-directive');
require('./chef-lab-template-directive');
require('./fetch-machine-service');
require('./store-service');
