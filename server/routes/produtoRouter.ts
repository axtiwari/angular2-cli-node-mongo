import { Router, Request, Response, NextFunction } from 'express';
import * as assert from 'assert';
import * as logger from 'logops';
import { join } from 'path';
import * as multer from 'multer';

// import { ProdutoService } from '../services/produtoService';
import { handleError } from '../commons/businessError';

export const produtoRouter: Router = Router();

// const produtoService: ProdutoService = new ProdutoService();


// const upload = multer(
// 	{
// 		dest: join(__dirname, '../../../uploadImgs/')
// 	});

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, join(__dirname, '../../../uploadImgs/'));
		//cb(null, join(__dirname, './uploadImgs/'));
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

//var limits = { fileSize: 0.5 * 1024 * 1024 };

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 1024
	},
	fileFilter: fileFilter,
});

produtoRouter.get('/', function (request: Request & { userName: string }, response: Response, next: NextFunction) {

	let userName = request.userName;

	let produtos = [];
	produtos.push({ nome: 'Pipoca', desc: 'Pipoca Doce', valor: 3.5, img: '2018-09-12T14-39-56.687Zthe-aletsch-glacier.jpg' });
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

produtoRouter.post('/', upload.single('myFile'), function (request: any, response: Response, next: NextFunction) {
	console.log('******* CHEGOU NO POST');
	console.log('******* IMAGE FILE:');
	console.log('dir = ', __dirname);
	console.log('dir2 = ', join(__dirname, '../../../uploadImgs/'));
	console.log(request.file);

	response.json({
		"status": "sucesso",
		"data": "File created at: " + request.file.path
	});
});

