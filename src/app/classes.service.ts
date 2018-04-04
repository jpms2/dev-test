import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClassesService {

  constructor(private http : HttpClient) { }

  api_address = "http://hom.plurieducacional.com.br/hom.semchamada.plurieducacional.com.br/back/public/aulas"

  makeHeader(token){
	const headerDict = {
	  'Content-Type': 'application/json',
	  'Authorization': token
	}

	const requestOptions = {                                       
	  headers: new HttpHeaders(headerDict), 
	};
	return requestOptions
  }

  collectClasses(token){
  	return this.http.get(this.api_address,this.makeHeader(token))
  }

}
