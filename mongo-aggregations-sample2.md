//Soma de valores agrupados por Compentencia e Categoria
db.lancamentos.aggregate([
    {
        $group:
            {
                _id:
                    {
                        data: { $dateToString: { format: "%Y%m", date: "$data" } },
                        categoria: "$categoria.nome"
                    },
                total: { "$sum": "$valor" }
            }
    },
    {
        $project: {
            _id: 0,
            competencia: "$_id.data",
            categoria: "$_id.categoria",
            total:1
        }
    },
    {
        $sort: { competencia: 1 }
    }
])
