import { ObjectID } from "mongodb";
import * as assert from "assert";
import * as co from "co";

import { logger, dataAccess } from "../app";
import { DataAccess } from "./abstractDAO";

// Create a class to manage the data manipulation.
export class LancamentoDAO extends DataAccess {

    // Get a new Student based on the user name.
    public getLancamentoByIds(idsLancamentos: any): any {

        //Converte os ids de String->ObjectID, para uso como parâmetro da consulta.
        let idsConstasAsObjectID = [];
        idsLancamentos.forEach(id => idsConstasAsObjectID.push(ObjectID.createFromHexString(id)));

        return dataAccess.getDocuments('lancamentos', { _id: { $in: idsConstasAsObjectID } });
    }

    public getLancamentoById(idLancamento: string): any {

        return dataAccess.getDocumentById('lancamentos', idLancamento);
    }

    public getLancamentoByDescricao(descricaoLancamento: string): any {

        return dataAccess.getDocument('lancamentos', { descricao: descricaoLancamento });
    }

    public insertLancamento(lancamento: any): any {

        return dataAccess.insertDocument(lancamento, 'lancamentos');
    }

    public removeLancamentoById(idLancamento: string): any {
        return dataAccess.removeDocumentById('lancamentos', idLancamento);
    }

    public updateLancamento(idLancamento: any, nomeNovaLancamento: any): any {

        if (dataAccess.dbConnection) {

            let query = { _id: new ObjectID(idLancamento) }
            let updateData = { nome: nomeNovaLancamento }

            return dataAccess.dbConnection.collection('lancamentos').update(query, { $set: updateData }, { w: 1 });
        }
    }
}
