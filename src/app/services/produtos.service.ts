
import { Injectable } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { Observable, Observer } from 'rxjs';

import { Log } from './../util/log';
import { MessagesService } from './messages.service';
import { DataService } from './data.service';
import { ApiHttpService } from './api-http.service';
import { Produto } from '../models/models.module';
import { ENV } from './env-config';

@Injectable()
export class ProdutosService extends DataService<Produto> {

	static baseUrl = `${ENV.BASE_API}produtos/`;

	constructor(apiHttp: ApiHttpService, _notificationsService: NotificationsService,
		private msgService: MessagesService) {
		super(apiHttp, _notificationsService, ProdutosService.baseUrl);
		this.successPostMessage = this.msgService.getMessage(this.msgService.SUCCESS_CREATE_LANCAMENTO);
		this.successDeleteMessage = this.msgService.getMessage(this.msgService.SUCCESS_DELETE_LANCAMENTO);
		this.successPutMessage = this.msgService.getMessage(this.msgService.SUCCESS_UPDATE_LANCAMENTO);
	}

	create(payLoad) {

		this._apiHttp
			.post(this.apiBaseUrl, payLoad)
			.subscribe(
				(jsonData: any) => {
				},
				error => {
					Log.error(error);
				});
	}

}
