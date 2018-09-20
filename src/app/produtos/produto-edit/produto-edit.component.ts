import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

import * as moment from 'moment';

import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';
import { Util } from '../../util/util';

@Component({
	selector: 'produto-edit',
	templateUrl: './produto-edit.component.html',
	styleUrls: ['./produto-edit.component.scss']
})
export class ProdutoEditComponent implements OnInit {

	@Input()
	produto: Produto;

	selectedFile: File = null;

	constructor(private produtoService: ProdutosService, private http: HttpClient) { }

	ngOnInit() {
	}

	onSelectFile(event) {
		console.log(event);
		this.selectedFile = <File>event.target.files[0];
	}

	onUpload() {
		const fd = new FormData();
		fd.append('image', this.selectedFile, this.selectedFile.name);

		const uploadData = new FormData();
		uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

		this.produtoService.postFormData(uploadData, {
			reportProgress: true,
			observe: 'events'
		}).subscribe((event: any) => {
			if (event.type === HttpEventType.UploadProgress) {
				console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
			} else if (event.type === HttpEventType.Response) {
				console.log(event);
			}
		});
	}

	salvarProduto(formValue) {

		console.debug('formValue = ', formValue);
		// Clona e atribui os dados do formulario no obj que sera enviado ao server
		 const novoProduto: any = new Produto();
		 Object.assign(novoProduto, formValue);

		// Parse form values
		//novoProduto.data = moment(formValue.data, 'DD/MM/YYYY').toDate();
		novoProduto.valor = Util.parseCurrency(formValue.valor);

		console.debug('novoProduto = ', novoProduto);

		// const formData = new FormData();
		// formData.append('myFile', this.selectedFile, this.selectedFile.name);

		// const formData = new FormData();
		// this.produtosService.postFormData(formData, {
		// 	reportProgress: true,
		// 	observe: 'events'
		// }).subscribe((event: any) => {
		// 	if (event.type === HttpEventType.UploadProgress) {
		// 		console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
		// 	} else if (event.type === HttpEventType.Response) {
		// 		console.log(event);
		// 	}
		// });

	}

}
