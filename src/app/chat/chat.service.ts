
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ApiHttpService } from '../services/api-http.service';
import { ENV } from '../services/env-config';

@Injectable()
export class ChatService {

	private chatMessageSource = new Subject<any>();
	chatMessage$ = this.chatMessageSource.asObservable();

	constructor(private _apiHttp: ApiHttpService) { }

	selectMessage(message){
		this.chatMessageSource.next(message);
	}

	sendMessage(text, context) {
		return this._apiHttp
			.post(`${ENV.BASE_API}conversation/`, { text, context });
	}
}
