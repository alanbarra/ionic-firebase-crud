import { Router } from '@angular/router';
import { CepService } from './../../services/cep.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  isValid: any;
  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private db: AngularFireDatabase,
    private route: Router,
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

  ngOnInit() {}

  cadastraContato() {
    this.db.database.ref('/contatos').push(this.contatoForm.value)
    .then(() => {
      console.log('salvou');
      this.contatoForm.reset();
      this.route.navigate(['/home']);
    });
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
