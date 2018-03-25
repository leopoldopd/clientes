angular.module('starter.controllers', [])

//CONTROLLER DA TELA DO CLIENTE AUTENTICADO, ONDE CONSEGUE EDITAR SUAS INFORMAÇÕES OU EXCLUIR SUA CONTA
.controller('ClienteCtrl', function($scope, $stateParams, $ionicPopup, $state, $ionicNavBarDelegate, ClienteFactory) {
  //DESATIVA O BACK BUTTON
  if($state.current.name == 'cliente'){
    $ionicNavBarDelegate.showBackButton(false);
  }

  //DECLARAÇÃO DO MÉTODO PARA PODERMOS BUSCAR O CLIENTE ATRAVÉS DO E-MAIL
  $scope.getClientePorEmail = function(){
    //FAZ CHAMADA AO SERVIÇO QUE BUSCA O CLIENTE, PASSANDO COMO PARAMETRO SEU E-MAIL
    ClienteFactory.getClientePorEmail($stateParams.clienteEmail)
          .then(function (response) {
            //RESPOSTA DE SUCESSO RETORNADA PELA API, JUNTO COM O OBJETO
            $scope.cliente = response.data;
          }, function (error) {
             //ERRO RETORNADO PELA API  
              $scope.status = 'Erro ao obter dados: ' + error.message;
          });
  }

  //CHAMADA DIRETO AO MÉTODO DE BUSCA DO CLIENTE, CARREGADO AO ENTRAR NA TELA DO CLIENTE
  $scope.getClientePorEmail();

  //METODO PARA ATUALIZAR CADASTRO DO CLIENTE, QUE INVOCA O METODO UPDATECLIENTE DO SERVIÇO DO CLIENTE, PASSANDO COMO PARÂMETRO O CLIENTE
  $scope.atualizarCadastro = function(){
    ClienteFactory.updateCliente($scope.cliente)
            .then(function (response) {
              //RESPOSTA DE SUCESSO RETORNADA PELA API
              var alertPopup = $ionicPopup.alert({
                title: 'Cliente Atualizado!',
                template: 'Suas informações de cadastro foram atualizadas no sistema!'
              });
            }, function (error) {
                //RESPOSTA DE ERRO RETORNADA PELA API
                $scope.status = 'Erro ao obter dados: ' + error.message;
            });
  }

  //METODO PARA EXCLUSÃO DO CLIENTE, QUE INVOCA O METODO DELETECLIENTE DO SERVIÇO DO CLIENTE, PASSANDO COMO PARÂMETRO O CPF DO CLIENTE
  $scope.excluirCadastro = function(){
    ClienteFactory.deleteCliente($scope.cliente.cpfCliente)
          .then(function (response) {
            //RESPOSTA DE SUCESSO RETORNADA PELA API
            var alertPopup = $ionicPopup.alert({
              title: 'Cliente Excluido',
              template: 'Suas informações de cadastro foram removidas do sistema!'
            });
            $state.go('login');
          }, function (error) {
            //RESPOSTA DE ERRO RETORNADA PELA API
            $scope.status = 'Unable to load customer data: ' + error.message;
          });
  }
})

.controller('CadastroCtrl', function($scope, ClienteFactory, $ionicNavBarDelegate,  $state,$ionicPopup){
  //DESATIVA O BACK BUTTON
  if($state.current.name == 'cadastro'){
    $ionicNavBarDelegate.showBackButton(true);
  }
  
  $scope.cliente = {}

  //METODO PARA INCLUSÃO DO CLIENTE, QUE INVOCA O METODO INCLUDECLIENTE DO SERVIÇO DO CLIENTE, PASSANDO COMO PARÂMETRO O CLIENTE
  $scope.realizarCadastro = function(){
      ClienteFactory.includeCliente($scope.cliente)
            .then(function (response) {
              //RESPOSTA DE SUCESSO RETORNADA PELA API
              var alertPopup = $ionicPopup.alert({
                title: 'Cadastro realizado com sucesso!',
                template: 'Efetue login com os dados informados no cadastro'
               });
              //INVOCA A TELA "LOGIN"
              $state.go('login');
            //RESPOSTA DE SUCESSO RETORNADA PELA API
            }, function (error) {
                //CASO O CÓDIGO SEJA 409, JÁ EXISTE UM USUÁRIO CADASTRADO NO SISTEMA
                if(error.status == 409){
                    var alertPopup = $ionicPopup.alert({
                      title: 'Usuário já cadastrado',
                      template: 'Já existe um usuário no sistema com o mesmo e-mail e/ou CPF'
                  });
                //ERRO RETORNADO PELO SISTEMA
                }else{
                    var alertPopup = $ionicPopup.alert({
                      title: 'Erro ao realizar cadastro',
                      template: 'Verifique os dados inseridos e tente novamente'
                  });
                }
                
            });
  }
})

.controller('LoginCtrl', function($scope, ClienteFactory, $ionicPopup, $state, $ionicHistory, $ionicNavBarDelegate) {
  //DESATIVA O BACK BUTTON
  if($state.current.name == 'login'){
    $ionicNavBarDelegate.showBackButton(false);
  }
  $scope.login = {};

  //INVOCA A TELA "CADASTRO"
  $scope.cadastrar = function(){
    $state.go('cadastro');
  }

  //INVOCA A TELA "CADASTRO"
  $scope.entrar = function () {
    ClienteFactory.authenticateCliente($scope.login)
          .then(function (response) {
              //INVOCA A TELA "CLIENTE", PASSANDO O EMAIL DO CLIENTE COMO PARAMETRO
              $state.go('cliente', {clienteEmail: $scope.login.email});
          }, function (error) {
            //ERRO RETORNADO PELO SISTEMA
            var alertPopup = $ionicPopup.alert({
                          title: 'Erro ao autenticar!',
                          template: 'Verifique o e-mail e a senha'
                      });
          })
  };
});
