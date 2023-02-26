import { logger } from "@lib/logger";
import { AppError, errorHandler } from "@lib/error-handling";
import { startServer } from "@entry/server";
// require('dotenv').config()

async function start() {
    return Promise.all([startServer()])
}

start().then((resultList) => {
    logger.info(`The app has started !! ${resultList}`);
}).catch((error) => {
    errorHandler.handleError(
        new AppError('startup-failure', error.message, 500, false, error)
    );
})