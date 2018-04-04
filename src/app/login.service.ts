import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http : HttpClient) { }

  api_address = "http://plurieducacional.com.br/homologacao/pluriidapi/webservice.php"

  validateLogin(email, password){
  	var json = JSON.stringify(
		{
		  "operacao": "008",
		  "chaveSistema": "356a192b7913b04c54574d18c28d46e6395428ab",
		  "login": email,
		  "senha": password
		}
	);
	return this.http.post(this.api_address,json)
  }

}
