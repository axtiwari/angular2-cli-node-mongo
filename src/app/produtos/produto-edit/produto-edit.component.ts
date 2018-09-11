import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../../models/produto.model';

@Component({
	selector: 'produto-edit',
	templateUrl: './produto-edit.component.html',
	styleUrls: ['./produto-edit.component.scss']
})
export class ProdutoEditComponent implements OnInit {

	@Input()
	produto: Produto;

	constructor() { }

	ngOnInit() {
	}

}
