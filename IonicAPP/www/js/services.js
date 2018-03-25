angular.module('starter.services', [])

.factory('ClienteFactory', ['$http', function ($http) {
  var urlBase = 'http://clientesapilpd.azurewebsites.net/api/clientes';
  //var urlBase = 'http://localhost:61677/api/clientes';
  var clienteFactory = {};
  clienteFactory.getClientes = function () {
      return $http.get(urlBase);
  };

  clienteFactory.authenticateCliente = function (login) {
    return $http({
      url: (urlBase + '/login'),
      method: 'POST',
      params: login,
      paramSerializer: '$httpParamSerializerJQLike'
    });
};

  clienteFactory.getCliente = function (cpfCliente) {
      return $http.get(urlBase + '/' + CpfCliente);
  };

  clienteFactory.getClientePorEmail = function (emailCliente) {
    return $http.get(urlBase + '/por_email/' + emailCliente);
};

  clienteFactory.includeCliente = function (cliente) {
      return $http({
        url: urlBase,
        method: 'POST',
        params: cliente,
        paramSerializer: '$httpParamSerializerJQLike'
      });
  };

  clienteFactory.updateCliente = function (cliente) {
    return $http({
      url: urlBase + '/' + cliente.cpfCliente,
      method: 'PUT',
      params: cliente,
      paramSerializer: '$httpParamSerializerJQLike'
    });
  };

  clienteFactory.deleteCliente = function (CpfCliente) {
      return $http.delete(urlBase + '/' + CpfCliente);
  };
  
  return clienteFactory;

}]);