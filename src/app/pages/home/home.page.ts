import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  contatosDb = [];

  constructor(
    private http: HttpClient, 
    private router: Router, 
  ) { }

  ngOnInit() {
    this.getDados();
  }

  getDados() {
    this.http.get('https://crud-ionic-firebase-a7eb9.firebaseio.com/contatos.json').subscribe(
      (res: any) => {
        console.log(res);
        if (res !== null && res !== undefined) {
          this.trataDados(res);
        }
      },
      (error: any) => {
        console.log('erro: ', error);
      }
    );
  }

  trataDados(dados) {
    this.contatosDb = Object.keys(dados).map(i => {
      dados[i]._id = i;
      return dados[i];
    });
  }

}
