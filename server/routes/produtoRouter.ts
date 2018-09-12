import { Router, Request, Response, NextFunction } from 'express';
import * as assert from 'assert';
import * as logger from 'logops';
import { join } from 'path';
import * as multer from 'multer';

// import { ProdutoService } from '../services/produtoService';
import { handleError } from '../commons/businessError';

export const produtoRouter: Router = Router();

// const produtoService: ProdutoService = new ProdutoService();


const upload = multer(
	{
		dest: join(__dirname, '../../uploadImgs/')
	});

produtoRouter.get('/', function (request: Request & { userName: string }, response: Response, next: NextFunction) {

	let userName = request.userName;

	let produtos = [];
	produtos.push({ nome: 'Pipoca', desc: 'Pipoca Doce', valor: 3.5, img: 'assets/img/avatars/1.jpg' });
	produtos.push({ nome: 'Sanduba', desc: 'Salgado', valor: 35.5, img: 'assets/img/avatars/2.jpg' });
	produtos.push({ nome: 'Refri', desc: 'Coca-Cola', valor: 7.5, img: 'assets/img/avatars/3.jpg' });
	produtos.push({ nome: 'Sorvete', desc: 'Doce de Leite', valor: 7.5, img: 'assets/img/avatars/4.jpg' });
	produtos.push({ nome: 'Pizza', desc: 'Portuguesa', valor: 7.5, img: 'assets/img/avatars/5.jpg' });
	produtos.push({ nome: 'Chocolate', desc: 'Caseiro', valor: 35.36, img: 'assets/img/avatars/6.jpg' });

	response.json({
		'status': 'sucesso',
		'data': produtos
	});

	// produtoService.getProdutos(userName)
	// 	.then(produtos => response.json({
	// 		"status": "sucesso",
	// 		"data": produtos
	// 	}))
	// 	.catch((e: Error) => handleError(e, response));
});

produtoRouter.post('/', upload.single('myimg'), function (request: any, response: Response, next: NextFunction) {
	console.log('******* CHEGOU NO POST');
	console.log('******* IMAGE FILE:');
	console.log(request.file);

});

