import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FiltroLancamentoService {

	private competenciaLancamentoSource = new Subject<string>();
	competenciaLancamento$ = this.competenciaLancamentoSource.asObservable();

	private selectedLancamentoSource = new Subject<any>();
	selectedLancamento$ = this.selectedLancamentoSource.asObservable();

	private selectedContasSource = new Subject<any>();
	selectedContas$ = this.selectedContasSource.asObservable();

	private selectedCategoriasSource = new Subject<any>();
	selectedCategorias$ = this.selectedCategoriasSource.asObservable();

	novaCompetencia(novaCompetencia: string) {
		this.competenciaLancamentoSource.next(novaCompetencia);
	}

	selectLancamento(lancamento: any) {
		console.debug('selectLancamento lancamento=', lancamento);
		this.selectedLancamentoSource.next(lancamento);
	}

	onSelectedContas(contas:any){
		console.debug('onSelectedContas contas=', contas);
	}

	onSelectedCategorias(categorias:any){
		console.debug('onSelectedCategorias categorias=', categorias);
	}
}
