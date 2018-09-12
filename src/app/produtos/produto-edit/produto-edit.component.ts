import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';

@Component({
	selector: 'produto-edit',
	templateUrl: './produto-edit.component.html',
	styleUrls: ['./produto-edit.component.scss']
})
export class ProdutoEditComponent implements OnInit {

	@Input()
	produto: Produto;

	selectedFile: File = null;

	constructor(private produtoService: ProdutosService) { }

	ngOnInit() {
	}

	onSelectFile(event) {
		console.log(event);
		this.selectedFile = <File>event.target.files[0];
	}

	onUpload() {
		const fd = new FormData();
		fd.append('image', this.selectedFile, this.selectedFile.name);
		this.produtoService.postFile(fd)
			.subscribe((event: HttpEventType) => {

				if (event.type === HttpEventType.UploadProgress) {
					console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
				} else (event.type === HttpEventType.Response) {
					console.log(event);
				}
			});

	}

}
