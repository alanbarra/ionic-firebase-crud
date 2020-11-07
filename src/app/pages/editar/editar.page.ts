import { AngularFireDatabase } from '@angular/fire/database';
import { CepService } from './../../services/cep.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  id: any = null;
  isValid: any;
  contatoForm: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private cepService: CepService,
    private db: AngularFireDatabase,
    private route: Router
  ) {
    this.contatoForm = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(5)]],
      empresa: [null, [Validators.minLength(3)]],
      telefone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      rua: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      uf: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log('id do editar: ', this.id);
  }

  editarContato() {
    console.log('edita cadastro');
  }

  buscaCep() {
    const cepValue = this.contatoForm.controls['cep'].value;
    this.isValid = this.contatoForm.controls['cep'].valid;

    console.log(this.isValid);

    if (this.isValid) {
      this.cepService.buscaEndereco(cepValue).subscribe(
        (res: any) => {
          console.log(res);
          this.insereValoresEndereco(res);
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }

  insereValoresEndereco(dados) {
    this.contatoForm.controls['rua'].setValue(dados.logradouro);
    this.contatoForm.controls['bairro'].setValue(dados.bairro);
    this.contatoForm.controls['cidade'].setValue(dados.localidade);
    this.contatoForm.controls['uf'].setValue(dados.uf);
  }

}
