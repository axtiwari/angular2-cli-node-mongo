import { Router, Request, Response, NextFunction } from 'express';
import * as assert from 'assert';
import * as logger from 'logops';

import * as AssistantV1 from 'watson-developer-cloud/assistant/v1';
// const AssistantV1 = require('watson-developer-cloud/assistant/v1');

// import { ProdutoService } from '../services/produtoService';
import { handleError } from '../commons/businessError';

export const chatBotRouter: Router = Router();

const assistant = new AssistantV1({
	username: '7816c41d-254a-4111-82d5-625ee6e4466c',
	password: '058Eurn2iu8m',
	url: 'https://gateway.watsonplatform.net/assistant/api',
	version: '2018-09-14',
});

chatBotRouter.post('/', function (req: Request & { userName: string }, res: Response, next: NextFunction) {

	try {
		console.log('Chegou no servidor !');

		const { text, context = {} } = req.body;

		console.log('text = ', text);
		console.log('context = ', context);

		const params = {
			input: { text },
			workspace_id: 'c921db24-9648-4a93-b657-7d4d56969172',
			context,
		};

		// console.log('assistant = ', assistant);

		assistant.message(params, (err, response) => {
			if (err) { res.status(500).json(err); }

			console.log('response = ', response);
			res.json(response);
		});
	} catch (e) {
		console.log('ERROR = ', e);
	}

});
