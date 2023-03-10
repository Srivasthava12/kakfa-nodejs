import { pino, Logger , DestinationStream } from "pino";
import { LOG_LEVELS, Logger as LoggerInterface } from "./definitions";


export default class PinoLogger implements LoggerInterface {
    readonly #logger: Logger;

    constructor(private level: LOG_LEVELS, prettyPrintEnabled: boolean, private destStream?: DestinationStream){
        this.#logger = pino({
            level:level,
            transport: prettyPrintEnabled
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    colorizeObjects: true,
                    sync: true,
                  },
                }
              : undefined,
          });
    }

    debug(message: string, metadata?: object): void {
        if (metadata) {
          this.#logger.debug(metadata, message);
        } else {
          this.#logger.debug(message);
        }
      }

      error(message: string, metadata?: object): void {
        if (metadata) {
          this.#logger.error(metadata, message);
        } else {
          this.#logger.error(message);
        }
      }
    
      info(message: string, metadata?: object): void {
        if (metadata) {
          this.#logger.info(metadata, message);
        } else {
          this.#logger.info(message);
        }
      }
    
      warning(message: string, metadata?: object): void {
        if (metadata) {
          this.#logger.warn(metadata, message);
        } else {
          this.#logger.warn(message);
        }
      }
}