import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManageProdutosComponent } from './manage-produtos.component';

@NgModule({
	imports: [
		RouterModule.forChild([{
			path: '',
			component: ManageProdutosComponent
		}])
	],
	exports: [
		RouterModule
	]
})
export class ProdutosRoutingModule { }
