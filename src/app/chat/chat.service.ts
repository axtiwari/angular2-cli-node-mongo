
import { Injectable } from '@angular/core';

import { ApiHttpService } from '../services/api-http.service';
import { ENV } from '../services/env-config';


@Injectable()
export class ChatService {

	constructor(private _apiHttp: ApiHttpService) { }

	sendMessage(text, context) {
		return this._apiHttp
			.post(`${ENV.BASE_API}conversation/`, { text, context });
	}
}
