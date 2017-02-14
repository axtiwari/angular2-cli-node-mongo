import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Conta } from "../models/models.module";
import { AuthService } from '../authentication/auth.service';
import { ApiHttpService } from './api-http-service';

// const CONTAS = [
//     new Conta("1", 'Conta Conjunta'),
//     new Conta("2", 'Cartão - Itaú'),
//     new Conta("3", 'Cartão - Santander'),
// ];

// let contasPromise = Promise.resolve(CONTAS);


@Injectable()
export class ContasService {

    sucesso$: Observable<string>;
    private _sucessos: BehaviorSubject<string>;

    erros$: Observable<string>;
    private _erros: BehaviorSubject<string>;
    
    contas: Observable<Conta[]>;
    private _contas: BehaviorSubject<Conta[]>;
    private contasStore: {
        contas: Conta[]
    };

    constructor(private apiHttp: ApiHttpService) {
        this.contasStore = { contas: [] };
        this._contas = <BehaviorSubject<Conta[]>>new BehaviorSubject([]);
        this.contas = this._contas.asObservable();

        this._sucessos = <BehaviorSubject<string>>new BehaviorSubject("");
        this.sucesso$ = this._sucessos.asObservable();

        this._erros = <BehaviorSubject<string>>new BehaviorSubject("");
        this.erros$ = this._erros.asObservable();
    }

    getAllContas() {

        this.apiHttp.get("/api/contas/")
            .subscribe(
            data => {
                console.log("Data return on service:", data);

                if (data.status === "sucesso") {
                    this.contasStore.contas = data.contas;
                    this._contas.next(Object.assign({}, this.contasStore).contas);
                }
            },
            error => {
                console.log(error);
            });
    }

    getContasById(id: string) {
        console.log("no service id=", id);
        console.log("no service this.contasStore=", this.contasStore);
        //TODO: tentar obtendo do observer do service com o find, sem ter q fezer outra chamada ao backend
    }

    getAll() {

        return this.apiHttp
            .get("/api/contas/")
            .subscribe(
            data => data,
            error => {
                console.log(error);
                return error;
            });
    }

    create(nomeConta) {

        this.apiHttp
            .post("/api/contas/", { nomeConta: nomeConta })
            .subscribe(
            data => {
                if (data.status === "sucesso") {
                    this.contasStore.contas.push(data.conta);
                    this._contas.next(Object.assign({}, this.contasStore).contas);

                    this._sucessos.next(`Conta "${nomeConta}" salva com sucesso.`);
                } else if (data.status === "erro") {
                    console.log(data.message);
                    this._erros.next(data.message);
                }
            },
            error => {
                console.log(error);
            });
    }

    remove(idConta) {

        this.apiHttp
            .delete(`/api/contas/${idConta}`)
            .subscribe(
            data => {
                if (data.status === "sucesso") {
                    this.contasStore.contas.forEach((c, i) => {
                        if (c._id === idConta) {
                            this.contasStore.contas.splice(i, 1);
                        }
                    });
                    this._contas.next(Object.assign({}, this.contasStore).contas);

                    this._sucessos.next('Conta removida com sucesso.');
                }
            },
            error => {
                console.log(error);
            });
    }

    update(idConta, nomeConta) {

        this.apiHttp
            .put(`/api/contas/${idConta}`, { nomeConta: nomeConta })
            .subscribe(
            data => {
                if (data.status === "sucesso") {
                    this.contasStore.contas.forEach((c, i) => {
                        if (c._id === data.conta._id) {
                            this.contasStore.contas[i] = data.conta;
                        }
                    });
                    this._contas.next(Object.assign({}, this.contasStore).contas);
                    
                    this._sucessos.next(`Conta "${nomeConta}" salva com sucesso.`);
                    
                } else if (data.status === "erro") {
                    console.log(data.message);
                    this._erros.next(data.message);
                }
            },
            error => {
                console.log(error);
            });
    }


    // getContas() {
    //     return contasPromise;
    // }

    // getContasById(id: string) {
    //     return contasPromise
    //         .then(contas => contas.find(conta => conta.id === id));
    // }
}
