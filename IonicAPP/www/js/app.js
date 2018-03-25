angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    //CONFIGURAÇÃO DOS ESTADOS DO PROGRAMA: LOGIN, CADASTRO E CLIENTE
    .state('cliente', {
      url: '/cliente',
      params: { clienteEmail: undefined },
      templateUrl: 'templates/cliente.html',
      controller: 'ClienteCtrl'
  })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

    .state('cadastro', {
      url: '/cadastro',
      templateUrl: 'templates/cadastro.html',
      controller: 'CadastroCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
