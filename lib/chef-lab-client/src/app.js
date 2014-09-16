/* global angular */

var app = angular.module('chefLabClient', []);

app.constant('chefLabUrl', process.env.CHEF_LAB_URL || 'http://localhost:3000');

require('./chef-lab-provisioner-directive');
require('./fetch-machine-service');
require('./store-service');
