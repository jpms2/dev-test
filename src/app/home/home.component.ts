import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from '../classes.service';
import { ClassInfo } from '../class-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ClassesService]
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private classesService : ClassesService,
  	private router : Router) { }

  token: string;

  classes_info: ClassInfo[] = [];
  filtered_info: ClassInfo[] = []
  info: ClassInfo;

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.token = params['token'];
    });

    this.collectClasses();
  }

  collectClasses(){
  	this.classesService.collectClasses(this.token)
  		.subscribe(data => this.fillClasses(data),
  				   err => this.router.navigate(['/login']))
  }

  fillClasses(data){
	data.data.forEach(classes => {
		this.info = new ClassInfo("","","","");
		this.info.aula_descricao = classes.aula_descricao;
		this.info.modulo_descricao = classes.modulo_descricao;
		this.info.disciplina_descricao = classes.disciplina_descricao;
		this.info.areaconhecimento_descricao = classes.areaconhecimento_descricao;
		this.classes_info.push(this.info);
	});
  }

  filterClasses(filter){
  	this.filtered_info = [];
  	if (filter.length > 2) {
  		this.classes_info.forEach(class_i => {
  			if (this.checkEquality(class_i.aula_descricao, filter)
  				|| this.checkEquality(class_i.modulo_descricao, filter) 
  				|| this.checkEquality(class_i.disciplina_descricao, filter) 
  				|| this.checkEquality(class_i.areaconhecimento_descricao, filter)) {
  				this.filtered_info.push(class_i);
  			}
  		});
  	}
  }

  checkEquality(a, b){
  	if(this.removerAcentos(a).toLowerCase().indexOf(this.removerAcentos(b).toLowerCase()) >= 0){
  		return true;
  	}else{
  		return false;
  	}
  }

  //Credits to https://gist.github.com/marioluan/6923123
  removerAcentos( newStringComAcento ) {
    var string = newStringComAcento;
   	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
  };

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
  }

  clearFilters(){
  	this.filtered_info = [];
  }

}
