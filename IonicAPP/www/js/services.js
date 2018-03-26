angular.module('starter.services', [])

//CRIA O SERVIÇO QUE IRÁ ACESSAR A ROTA DE CLIENTE NA API
.factory('ClienteFactory', ['$http', function ($http) {
  var urlBase = 'http://clientesapilpd.azurewebsites.net/api/clientes';
  var clienteFactory = {};
  //CRIA O MÉTODO QUE FAZ UMA REQUISIÇÃO GET PARA A ROTA DE CLIENTES
  clienteFactory.getClientes = function () {
      return $http.get(urlBase);
  };

  //CRIA O MÉTODO QUE FAZ UMA REQUISIÇÃO POST PARA A ROTA DE LOGIN
  clienteFactory.authenticateCliente = function (login) {
    return $http({
      url: (urlBase + '/login'),
      method: 'POST',
      params: login,
      paramSerializer: '$httpParamSerializerJQLike'
    });
};
  //CRIA O MÉTODO QUE FAZ UMA REQUISIÇÃO GET PARA A ROTA DE CLIENTES, PASSANDO O CPF COMO PARAMETRO
  clienteFactory.getCliente = function (cpfCliente) {
      return $http.get(urlBase + '/' + CpfCliente);
  };

  //CRIA O MÉTODO QUE FAZ UMA REQUISIÇÃO GET PARA A ROTA DE CLIENTES, PASSANDO O E-MAIL COMO PARAMETRO
  clienteFactory.getClientePorEmail = function (emailCliente) {
    return $http.get(urlBase + '/por_email/' + emailCliente);
};

  //CRIA O MÉTODO QUE FAZ UMA REQUISIÇÃO POST PARA A ROTA DE CLIENTES, PASSANDO O CLIENTE COMO PARÂMETRO
  clienteFactory.includeCliente = function (cliente) {
      return $http({
        url: urlBase,
        method: 'POST',
        params: cliente,
        paramSerializer: '$httpParamSerializerJQLike'
      });
  };

  //CRIA O MÉTODO QUE FAZ UMA REQUISIÇÃO PUT PARA A ROTA DE CLIENTES, PASSANDO O CLIENTE COMO PARAMETRO
  clienteFactory.updateCliente = function (cliente) {
    return $http({
      url: urlBase + '/' + cliente.cpfCliente,
      method: 'PUT',
      params: cliente,
      paramSerializer: '$httpParamSerializerJQLike'
    });
  };

  //CRIA O MÉTODO QUE FAZ UMA REQUISIÇÃO DELETE PARA A ROTA DE CLIENTES, PASSANDO O CPF COMO PARAMETRO
  clienteFactory.deleteCliente = function (CpfCliente) {
      return $http.delete(urlBase + '/' + CpfCliente);
  };
  
  //RETORNA O SERVIÇO COM OS MÉTODOS CRIADOS
  return clienteFactory;

}]);