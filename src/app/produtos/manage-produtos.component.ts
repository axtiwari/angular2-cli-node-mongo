import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto.model';

@Component({
	templateUrl: './manage-produtos.component.html',
	styleUrls: ['./manage-produtos.component.scss']
})
export class ManageProdutosComponent {

	isNovoProduto = false;
	novoProduto: Produto = undefined;


	addProduto() {
		this.isNovoProduto = true;
		this.novoProduto = new Produto();
		this.novoProduto.nome = 'new prod name';
		this.novoProduto.valor = 234;
	}

}
