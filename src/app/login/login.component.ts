import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) { }

  failedValidation = false
  error = ""

  ngOnInit() {
  }

  validate(form:NgForm){
  	if (form.value.email != '' && form.value.password != '' ) {
  		this.loginService.validateLogin(form.value.email,form.value.password)
  		.subscribe(data => this.check_validation(data))
  	}
  }

  check_validation(data){
  	if (data.sucesso){
  		this.router.navigate(['/home', data.informacoesUsuario.token])
  		this.failedValidation = false
  	}else{
  		this.failedValidation = true
  		this.error = data.erros[0].descricaoErro
  	}
  }

}
