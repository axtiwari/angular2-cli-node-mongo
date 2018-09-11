import { Model } from './generic-model.model';

export class Produto extends Model {

	constructor(public _id?: string, public nome?: string, public descricao?: string, public valor?: number) {
		super(_id);
	}
}
