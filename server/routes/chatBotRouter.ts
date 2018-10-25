import { Router, Request, Response, NextFunction } from 'express';
import * as logger from 'logops';

import * as AssistantV1 from 'watson-developer-cloud/assistant/v1';
// const AssistantV1 = require('watson-developer-cloud/assistant/v1');

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
		logger.info('Chegou no servidor !');

		const { text, context = {} } = req.body;

		logger.info('text = ', text);
		logger.info('context = ', context);

		const params = {
			input: { text },
			// workspace_id: 'c921db24-9648-4a93-b657-7d4d56969172',
			workspace_id: '1e5f7992-afca-43df-848b-9223d37b6935',			
			context,
		};

		assistant.message(params, (err, response: any) => {
			logger.info('response  do Watson= ', response);
			if (err) {
				res.status(500).json(err);
			}
			response = transformResponse(response);			
			res.json(response);
		});
	} catch (e) {
		logger.info('ERROR = ', e);
	}

});

function transformResponse(response) {
	let newResponse = {
		context: response.context,
		messages: response.output.generic,
		intents: response.intents
	}
	return newResponse;
}
