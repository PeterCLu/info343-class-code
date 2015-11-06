/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return localStorageService.get(storageKey) || [];
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/contacts',
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactsController'
            })
            .state('detail', {
            url: '/contacts/:id',
            templateUrl: 'views/contact-detail.html',
            controller: 'ContactDetailController'
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });

        $urlRouterProvider.otherwise('/contacts');
    })
    //register directive for custom validation of dates in the past
    .directive('intThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) {
                    var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })
    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts, storageKey, localStorageService) {
        $scope.contact = contacts.find(function(contact) {
            //$stateParams.id matches contacts/:id
            //cotact.id matches to id attribute in the original factory function
            return contact.id === $stateParams.id;
        });

        $scope.delete = function() {
            contacts.pop($scope.contact);
            localStorageService.set(storageKey, contacts);
            $state.go('list');
        }
    })
    .controller('EditContactController', function($scope, $stateParams, $state, uuid, localStorageService, storageKey, contacts) {
        var existingContact = contacts.find(function(contact) {
            //$stateParams.id matches contacts/:id
            //cotact.id matches to id attribute in the original factory function
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.saveContact = function() {
            if ($scope.contact.id) {
                angular.copy($scope.contact, existingContact);

            } else {
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact);
            }
            localStorageService.set(storageKey, contacts);

            $state.go('list');
        };
    });
