import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import * as moment from 'moment';

import { Log } from './../util/log';
import { Lancamento } from "../models/models.module";
import { FiltroLancamentoService } from './filtro-lancamento.service';


@Component({
	selector: 'lancamentos-filtro',
	templateUrl: './lancamentos-filtro.component.html',
	styleUrls: ['./lancamentos-filtro.component.scss']
})
export class LancamentosFiltroComponent implements OnInit {

	@Output() onShowCategoriaChange = new EventEmitter<Lancamento>();
	@Output() onAdicionar = new EventEmitter<Lancamento>();

	categoryClass: {};
	showCategorias = true;
	showDatePicker = false;
	mesCompetencia: any = new Date().toISOString();

	constructor(private filtroLancamentoService: FiltroLancamentoService) { }

	ngOnInit() {

		this.setCategoryClass();

		this.filtroLancamentoService.competenciaLancamento$
			.distinctUntilChanged()
			.subscribe(
			novaCompetencia => {
				Log.info('Nova competência informada:', novaCompetencia)

				this.mesCompetencia = moment(novaCompetencia, 'YYYYMM').toDate();
			}
			)
	}

	adicionar() {
		this.onAdicionar.emit(new Lancamento());
	}

	previousMonth() {
		this.mesCompetencia = moment(this.mesCompetencia, 'YYYY-MM-DD').subtract(1, 'months').toDate();

		this.notificaNovaCompetencia();
	}

	nextMonth() {
		this.mesCompetencia = moment(this.mesCompetencia, 'YYYY-MM-DD').add(1, 'months').toDate();

		this.notificaNovaCompetencia();
	}

	onCompetenciaChanged(competencia: string) {
		let pattern = new RegExp(/\d\d\/\d\d\d\d/);

		if (pattern.test(competencia)) {
			this.mesCompetencia = moment(competencia, 'MM/YYYY').toDate();

			this.notificaNovaCompetencia();
		}
	}

	onSelectionDone(dataCalendario: Date) {
		this.showDatePicker = false;
		this.mesCompetencia = moment(dataCalendario, 'YYYY-MM-DD').toDate();

		this.notificaNovaCompetencia();
	}

	notificaNovaCompetencia() {
		this.filtroLancamentoService.novaCompetencia(moment(this.mesCompetencia, 'YYYY-MM-DD').format('YYYYMM'));
	}

	categoriaChange() {
		this.showCategorias = !this.showCategorias;
		this.onShowCategoriaChange.emit(this.showCategorias);

		this.setCategoryClass();
	}

	setCategoryClass() {
		this.categoryClass = {
			"btn": true,
			"btn-secondary": !this.showCategorias,
			"btn-show-categoria-on": this.showCategorias
		}
	}
}