import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';

@Component({
	selector: 'produtos-list',
	templateUrl: './produtos-list.component.html',
	styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

	public produtos$: any;
	public produtos: any;

	constructor(private _produtosService: ProdutosService) { }

	ngOnInit() {
		// this.produtos.push({ nome: 'Pipoca', desc: 'Pipoca Doce', valor: 3.5, img: 'assets/img/avatars/1.jpg' });
		// this.produtos.push({ nome: 'Sanduba', desc: 'Salgado', valor: 35.5, img: 'assets/img/avatars/2.jpg' });
		// this.produtos.push({ nome: 'Refri', desc: 'Coca-Cola', valor: 7.5, img: 'assets/img/avatars/3.jpg' });
		// this.produtos.push({ nome: 'Sorvete', desc: 'Doce de Leite', valor: 7.5, img: 'assets/img/avatars/4.jpg' });
		// this.produtos.push({ nome: 'Pizza', desc: 'Portuguesa', valor: 7.5, img: 'assets/img/avatars/5.jpg' });
		// this.produtos.push({ nome: 'Chocolate', desc: 'Caseiro', valor: 35.36, img: 'assets/img/avatars/6.jpg' });
		this.produtos$ = this._produtosService.obterProdutos()
			.subscribe((jsonData) => {
				if (jsonData.status === "sucesso") {
					this.produtos = jsonData.data;
				}
			});
	}

}
