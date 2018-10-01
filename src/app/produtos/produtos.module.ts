import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { ProdutosRoutingModule } from './produtos.routing';
import { ManageProdutosComponent } from './manage-produtos.component';
import { ProdutosService } from '../services/produtos.service';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { ProdutoEditComponent } from './produto-edit/produto-edit.component';


@NgModule({
	declarations: [
		ManageProdutosComponent,
		ProdutosListComponent,
		ProdutoEditComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		ProdutosRoutingModule,
		SharedPipesModule,
		SharedDirectivesModule,
		SweetAlert2Module
	],
	providers: [
		ProdutosService
	]
})
export class ProdutosModule { }