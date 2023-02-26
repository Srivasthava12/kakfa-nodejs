import { Server } from 'http';
import { AddressInfo } from 'net';
import * as configurationProvider from '@lib/config-provider'
import { logger } from '@lib/logger';
import config from 'config';
import express from 'express'
import { addRequestIdMiddleware } from '@lib/request-context'
import { Router } from './routes'
import { errorHandler } from '@lib/error-handling'



let connection: Server;


async function startServer(): Promise<AddressInfo> {
    // Declare a strict configuration schema and fail fast if the configuration is invalid
    configurationProvider.initializeAndValidate(config)
    console.log('configurationProvider.getValue>> ', configurationProvider.getValue('port'));
    logger.configureLogger({
        prettyPrint: Boolean(configurationProvider.getValue('logger.prettyPrint')),
    }, true)

    const expressApp = express();
    expressApp.use(addRequestIdMiddleware)
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(express.json());
    Router.build(expressApp)
    handleErrorMiddleware(expressApp)
    const APIAddress = await openConnection(expressApp);
    return APIAddress;
}


async function stopServer() {
    return new Promise<void>((resolve) => {
        if (connection !== undefined) {
            connection.close(() => {
                resolve();
            });
        }
    });
}

async function openConnection(expressApp: express.Application): Promise<AddressInfo> {
    return new Promise((resolve) => {
        const portToListenTo = configurationProvider.getValue('port');
        const webServerPort = portToListenTo || 0;
        logger.info(`Server is about to listen to port ${webServerPort}`);
        connection = expressApp.listen(webServerPort, () => {
            errorHandler.listenToErrorEvents(connection);
            resolve(connection.address() as AddressInfo);
        });
    });
}



function handleErrorMiddleware(expressApp: express.Application) {
    expressApp.use(
        async (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            error: any,
            req: express.Request,
            res: express.Response,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            next: express.NextFunction
        ) => {
            if (error && typeof error === 'object') {
                if (error.isTrusted === undefined || error.isTrusted === null) {
                    error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
                }
            }
            errorHandler.handleError(error);
            res.status(error?.HTTPStatus || 500).end();
        }
    );
}


export {startServer, stopServer}

