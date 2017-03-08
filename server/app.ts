import 'core-js/es7/reflect';
import * as express from "express";
import * as expressLogging from 'express-logging';
import * as logger from 'logops';
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";
import { Container } from 'typedi';

import { loginRouter } from "./routes/loginRouter";
import { protectedRouter } from "./routes/protectedRouter";
import { userRouter } from "./routes/userRouter";
import { contaRouter } from "./routes/contaRouter";
import { lancamentoRouter } from "./routes/lancamentoRouter";
import { DataAccess } from "./dal/abstractDAO";

const app: express.Application = express();

//Inicializa conexão
// var dataAccess = new DataAccess();
// dataAccess.openDbConnection();
 var dataAccess = undefined;

//Log config - express-logging
app.use(expressLogging(logger));
logger.info("** LOGGER INICIALIZADO");

//Disable header: X-Powered-By:Express
app.disable("x-powered-by");
app.use(favicon(join(__dirname, "../../src", "favicon.ico")));
app.use(express.static(join(__dirname, '../../dist')));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/", loginRouter);
app.use("/api", protectedRouter);
app.use("/api/users", userRouter);
app.use("/api/contas", contaRouter);
app.use("/api/lancamentos", lancamentoRouter);

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {

    app.use(express.static(join(__dirname, '../../node_modules')));
    //app.use(express.static(join(__dirname, '../../tools')));

    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

app.use('/*', function(request: express.Request, response: express.Response) {
    // response.redirect(join(__dirname, '../../public/index.html'));
    //response.sendFile("index.html", {root:join(__dirname, "../../src")});
    response.sendFile(join(__dirname, '../../dist', 'index.html'));
});

// Porta que o express irá escutar as requisições
const port: number = process.env.PORT || 3002;

// Iniciar o servidor na porta especificada
app.listen(port, () => {
    // Mensagem de inicialização com sucesso
    Container.get(DataAccess).openDbConnection();
    logger.info(`## Escutando no endereço: http://localhost:${port}/`);
});

// catch 404 and forward to error handler
// app.use(function(req: express.Request, res: express.Response, next) {
//     let err = new Error("Not Found");
//     next(err);
// });

// production error handler
// no stacktrace leaked to user
// app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
//     res.status(err.status || 500);
//     res.json({
//         error: {},
//         message: err.message
//     });
// });


export { app };
export { logger };
//export { dataAccess };
