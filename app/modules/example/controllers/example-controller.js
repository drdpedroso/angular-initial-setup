(function () {
  'use strict';

  function exampleController($state){
      let self = this;

      self.mock = {
		"data": {
			"entries": [
				{
					"actionType": "WITHDRAW",
					"dateTime": 1466426862686,
					"totalAmount": 69.99,
					"id": "52383902-b120-4777-8ed3-d9b1e3578e3a",
					"title": "Resgate",
					"description": "Eduardo Pedroso",
					"transactionId": "B1E2420E-EB90-8E56-8244-EC220627E095",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"Banco\":\"12\",\"Transação\":\"B1E2420E-EB90-8E56-8244-EC220627E095\",\"Data\":\"20/06/16 12:47\",\"Conta\":\"5648888\",\"Agência\":\"958858\",\"Valor\":\"69.99\"}"
				},
				{
					"actionType": "WITHDRAW",
					"dateTime": 1466426770821,
					"totalAmount": 5.55,
					"id": "cb14b279-8299-4065-9b3d-2c084f667ddb",
					"title": "Resgate",
					"description": "Eduardo Pedroso",
					"transactionId": "AA7AEFE7-401A-8B73-A4D9-FF5654A22D0D",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"Banco\":\"12\",\"Transação\":\"AA7AEFE7-401A-8B73-A4D9-FF5654A22D0D\",\"Data\":\"20/06/16 12:46\",\"Conta\":\"565555\",\"Agência\":\"5565\",\"Valor\":\"5.55\"}"
				},
				{
					"actionType": "WITHDRAW",
					"dateTime": 1466424546365,
					"totalAmount": 5.55,
					"id": "9f64090b-0b54-442f-955b-4d8cc07f385e",
					"title": "Resgate",
					"description": "Eduardo Pedroso",
					"transactionId": "2E0BCFC8-EA55-E1EE-610E-A929BC663C00",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"Banco\":\"4\",\"Transação\":\"2E0BCFC8-EA55-E1EE-610E-A929BC663C00\",\"Data\":\"20/06/16 12:09\",\"Conta\":\"5555655\",\"Agência\":\"23552\",\"Valor\":\"5.55\"}"
				},
				{
					"actionType": "WITHDRAW",
					"dateTime": 1466095927798,
					"totalAmount": 33.33,
					"id": "a26ed029-f8f4-42bb-9fff-acad1bb9fd37",
					"title": "Resgate",
					"description": "Eduardo Pedroso",
					"transactionId": "BF7054FE-0F7A-4DC1-9032-DE88CA98EDCD",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"Banco\":\"4\",\"Transação\":\"BF7054FE-0F7A-4DC1-9032-DE88CA98EDCD\",\"Data\":\"16/06/16 16:52\",\"Conta\":\"5553355\",\"Agência\":\"2555\",\"Valor\":\"33.33\"}"
				},
				{
					"actionType": "PAYMENT_SENDER",
					"status": "CREATED",
					"transactionType": "CreditCard",
					"dateTime": 1466010297482,
					"totalAmount": 100,
					"id": "107e4fac-02be-40b1-be4b-a5ab7f32a642",
					"title": "Pagamento - MATERA DELIVERY",
					"description": "Eduardo Pedroso",
					"transactionId": "3886E580-897E-92DD-AFFE-87F9B09E215B",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"Bandeira cartão\":\"VISA\",\"Forma de Pagamento\":\"CreditCard\",\"Destinatário\":\"MATERA RESTAURANT\",\"Pedido\":\"1\",\"Nº cartão\":\"497010******0007\",\"Transação\":\"3886E580-897E-92DD-AFFE-87F9B09E215B\",\"Data\":\"15/06/16 17:04\",\"Valor\":\"100.00\"}"
				},
				{
					"actionType": "UPDATE_ACCOUNT",
					"dateTime": 1465837307149,
					"id": "68df180e-7b02-4886-8a26-e88f485f1635",
					"title": "Alteração de cadastro",
					"description": "Eduardo Pedroso",
					"transactionId": "93B5C9F2-6AD3-6CD5-78C3-3CD48A03D5AE",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"Complemento antes\":\"\",\"Complemento depois\":\"complemento\",\"Logradouro antes\":\"Rua Doutor Camilo Marques Paula , 340, Vila Suica\",\"Logradouro depois\":\"Rua Doutor Camilo Marques Paula\",\"Transação\":\"93B5C9F2-6AD3-6CD5-78C3-3CD48A03D5AE\"}"
				},
				{
					"actionType": "UPDATE_ACCOUNT",
					"dateTime": 1465830282737,
					"id": "5d56ec8c-b620-4222-a5ec-d49d383150cf",
					"title": "Alteração de cadastro",
					"description": "Eduardo Pedroso",
					"transactionId": "2CE02475-2424-574B-4FCC-DDD7C1369232",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"Cep antes\":\"\",\"Cep depois\":\"13333440\",\"Cidade antes\":\"\",\"Cidade depois\":\"Indaiatuba\",\"Estado antes\":\"\",\"Estado depois\":\"SP\",\"Logradouro antes\":\"\",\"Logradouro depois\":\"Rua Doutor Camilo Marques Paula , 340, Vila Suica\",\"Nome completo antes\":\"eduardo\",\"Nome completo depois\":\"Eduardo Pedroso\",\"Número antes\":\"\",\"Número depois\":\"340\",\"Transação\":\"2CE02475-2424-574B-4FCC-DDD7C1369232\"}"
				},
				{
					"actionType": "EFFECTIVE_CREATE_ACCOUNT",
					"dateTime": 1465581642807,
					"id": "f407494b-409d-4cbe-9302-ec42ff6550b0",
					"title": "Efetivação de criação de cadastro",
					"description": "eduardo",
					"transactionId": "D15E27AE-6404-2492-3892-887018D2B5A0",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"CPF/CNPJ\":\"23223344136\",\"DDD+número celular\":\"19981713271\",\"Nome Completo\":\"eduardo\",\"e-mail\":\"email@ggss.com\"}"
				},
				{
					"actionType": "REQUEST_CREATE_ACCOUNT",
					"dateTime": 1465581537392,
					"id": "7b083a58-4421-4197-b862-abeefacbf1fc",
					"title": "Solicitação de criação de cadastro",
					"description": "eduardo",
					"transactionId": "D15E27AE-6404-2492-3892-887018D2B5A0",
					"accountId": "F1C08208-EE2E-0F96-418C-781C95CBC927",
					"details": "{\"CPF/CNPJ\":\"23223344136\",\"DDD+número celular\":\"19981713271\",\"Nome Completo\":\"eduardo\",\"e-mail\":\"email@ggss.com\"}"
				}
			]
		}
	  };

      self.click = (line) => {
          $state.go('details', {
              line: line
          });
      };


  }

  exampleController.$inject = ['$state'];

  angular.module('angular-mdl-skeleton').controller('ExampleController', exampleController);
}());
