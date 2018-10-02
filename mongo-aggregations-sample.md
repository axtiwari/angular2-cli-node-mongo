//db.users.find()


/*db.users.insertMany([
    {
        "username": "financeiro",
        "password": "$2a$10$R.KXkBGC9cJaXRaUgcxPpuAWy5.AMpkrt4UxrI0b2cg3CEwXsgeEi",
        "role": "FINANCEIRO"
    },
    {
        "username": "auditoria",
        "password": "$2a$10$s.Mu1K5MO7XLnXwaom/sO.Jg8VcKXn9nxfQkGkW7MDRnSjCBxgnf.",
        "role": "AUDITORIA"
    }
])*/


db.transactions.find({ transactionID: '2843f370-e79d-4340-b41f-f1b225a50935' })
db.transactions.find({ error_code: { $gt: 0 } })
db.transactions.find({ $expr: { maxDate: { $max: "$date" } } })

//.projection({})
//.sort({ _id: -1 })

// Sender types
db.transactions.distinct('sender')
// Group - Total by Senders
db.transactions.aggregate({ "$group": { "_id": "$sender", "total": { "$sum": 1 } } })
// Group - Total by Type
db.transactions.aggregate({ "$group": { "_id": "$type", "total": { "$sum": 1 } } })

// Varios operadores Group by sender
db.transactions.aggregate({
    "$group": {
        "_id": "$type",
        "qtd": { "$sum": 1 },
        "maximo": { "$max": "$value" },
        "media": { "$avg": "$value" },
        "minimo": { "$min": "$value" },
    }
})


// Qtd de erros por tipo de erro maiores que 0
db.transactions.aggregate([
    {
        $match: {
            "error_code": { "$gt": 0 }
        }
    },
    {
        $group: {
            _id: "$error_code",
            count: {
                $sum: 1
            }
        }
    }
]);

// TOP 3 Senders with max value of transaction
db.transactions.aggregate([
    {
        $match: {
            "value": { "$gt": 0 }
        }
    },
    {
        $group: {
            "_id": "$sender",
            "qtd": { $sum: 1 },
            "valor": { $max: "$value" }
        }
    },
    {
        $project: {
            "sender": "$sender",
            "qtd": "$qtd",
            "valor": "$valor"
        }
    },
    {
        $sort: {
            "valor": -1
        }
    },
    {
        "$limit": 3
    }
])

// Obter menor e maior data
db.transactions.aggregate([
    {
        $group:
            {
                _id: null,
                minDate: { $min: "$date" },
                maxDate: { $max: "$date" }
            }
    }
])


// * Quantidade de transacoes Group by competencia e remetente
db.transactions.aggregate([
    {
        $group:
            {
                _id:
                    {
                        data: { $dateToString: { format: "%Y%m", date: "$date" } },
                        sender: "$sender"
                    },
                count: { "$sum": 1 }
            }
    },
    {
        $sort: { "_id.data": 1 }
    }
])


// * Quantidade de erros Group by competencia e remetente (com projeção)
db.transactions.aggregate([
    {
        $match: {
            "error_code": { "$gt": 0 }
        }
    },
    {
        $group:
            {
                _id:
                    {
                        data: { $dateToString: { format: "%Y%m", date: "$date" } },
                        sender: "$sender"
                    },
                errors: { $push: "$error_code" }
            }
    },
    {
        $project: {
            _id: 0,
            competencia: "$_id.data",
            remetente: "$_id.sender",
            errors: 1,
            qtderros: { $size: "$errors" }
        }
    },
    {
        $sort: { competencia: 1, qtderros: 1 }
    }
])

// * Quantidade de erros DISTINTOS, Group by competencia e remetente, mas usando o $UNWIND (flat array). 
db.transactions.aggregate([
    {
        $unwind: "$error_code"
    },
    {
        $group:
            {
                _id:
                    {
                        data: { $dateToString: { format: "%Y%m", date: "$date" } },
                        sender: "$sender"
                    },
                errors: { $addToSet: "$error_code" }
            }
    },
    {
        $project: {
            _id: 0,
            competencia: "$_id.data",
            remetente: "$_id.sender",
            errors: 1,
            qtderros: { $size: "$errors" }
        }
    },
    {
        $sort: { competencia: 1 }
    }
])