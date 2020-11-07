import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  public buscaEndereco(cep: string): Observable<any> {
    const url = "https://viacep.com.br/ws/" + cep + "/json/";
    return this.http.get<any>(url);
  }
}
