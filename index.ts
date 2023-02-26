import { logger } from "@lib/logger";
import { AppError, errorHandler } from "@lib/error-handling";
import { startServer } from "@entry/server";
import config from 'config';
import * as configurationProvider from '@lib/config-provider'
// import { startMessaging } from "@entry/messaging"
require('dotenv').config()

async function start() {
    // Declare a strict configuration schema and fail fast if the configuration is invalid
    configurationProvider.initializeAndValidate(config)
    logger.configureLogger({
        prettyPrint: Boolean(configurationProvider.getValue('logger.prettyPrint')),
    }, true)
    
    return Promise.all([startServer() ])
}

start().then((resultList) => {
    logger.info(`The app has started !! ${resultList}`);
}).catch((error) => {
    errorHandler.handleError(
        new AppError('startup-failure', error.message, 500, false, error)
    );
})